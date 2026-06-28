import { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'

const formularioInicial = {
  titulo: '',
  descripcion: '',
  fecha: '',
  hora_inicio: '',
  hora_fin: '',
  plazas: '',
  entrenador_id: ''
}

export const useGestorClases = () => {
  const { request } = useFetch()
  const [clases, setClases] = useState([])
  const [formulario, setFormulario] = useState(formularioInicial)
  const [claseEditando, setClaseEditando] = useState(null)
  const [mensaje, setMensaje] = useState('Cargando clases...')
  const [cargando, setCargando] = useState(false)

  const cargarClases = async () => {
    try {
      setMensaje('Cargando clases...')

      const resultado = await request('/clases')

      setClases(resultado.data)
      setMensaje('')
    } catch (error) {
      setMensaje(error.message)
    }
  }

  useEffect(() => {
    const fetchClases = async () => {
      await cargarClases()
    }

    fetchClases()
  }, [])

  const manejarCambio = (evento) => {
    const { name, value } = evento.target

    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  const limpiarFormulario = () => {
    setFormulario(formularioInicial)
    setClaseEditando(null)
  }

  const prepararDatosClase = () => ({
    ...formulario,
    plazas: Number(formulario.plazas),
    entrenador_id: Number(formulario.entrenador_id)
  })

  const guardarClase = async (evento) => {
    evento.preventDefault()
    setCargando(true)
    setMensaje('')

    try {
      const datosClase = prepararDatosClase()

      if (claseEditando) {
        await request(`/clases/${claseEditando.id}`, {
          method: 'PATCH',
          body: datosClase
        })
        setMensaje('Clase actualizada correctamente')
      } else {
        await request('/clases', {
          method: 'POST',
          body: datosClase
        })
        setMensaje('Clase creada correctamente')
      }

      limpiarFormulario()
      await cargarClases()
    } catch (error) {
      setMensaje(error.message)
    } finally {
      setCargando(false)
    }
  }

  const seleccionarClaseParaEditar = (clase) => {
    setClaseEditando(clase)
    setFormulario({
      titulo: clase.titulo || '',
      descripcion: clase.descripcion || '',
      fecha: clase.fecha ? clase.fecha.slice(0, 10) : '',
      hora_inicio: clase.hora_inicio || '',
      hora_fin: clase.hora_fin || '',
      plazas: clase.plazas || '',
      entrenador_id: clase.entrenador_id || ''
    })
    setMensaje('Editando clase seleccionada')
  }

  const borrarClase = async (id) => {
    setCargando(true)
    setMensaje('')

    try {
      await request(`/clases/${id}`, {
        method: 'DELETE'
      })
      setMensaje('Clase eliminada correctamente')
      await cargarClases()
    } catch (error) {
      setMensaje(error.message)
    } finally {
      setCargando(false)
    }
  }

  return {
    clases,
    formulario,
    claseEditando,
    mensaje,
    cargando,
    manejarCambio,
    guardarClase,
    limpiarFormulario,
    seleccionarClaseParaEditar,
    borrarClase
  }
}
