import { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import DateObject from 'react-date-object'
import Swal from 'sweetalert2'

const formularioInicial = {
  titulo: '',
  descripcion: '',
  fecha: '',
  hora_inicio: '',
  hora_fin: '',
  plazas: ''
}

const ENTRENADOR_ID = 1

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

  const manejarCambioFecha = (fecha) => {
    setFormulario({
      ...formulario,
      fecha: fecha ? new DateObject(fecha).format('YYYY-MM-DD') : ''
    })
  }

  const manejarCambioHora = (name, hora) => {
    const horaFormateada = hora
      ? `${String(hora.getHours()).padStart(2, '0')}:${String(hora.getMinutes()).padStart(2, '0')}`
      : ''

    setFormulario({
      ...formulario,
      [name]: horaFormateada
    })
  }

  const limpiarFormulario = () => {
    setFormulario(formularioInicial)
    setClaseEditando(null)
  }

  const prepararDatosClase = () => ({
    ...formulario,
    plazas: Number(formulario.plazas),
    entrenador_id: ENTRENADOR_ID
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

        await Swal.fire({
          title: 'Clase actualizada',
          text: 'La clase se ha actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      } else {
        await request('/clases', {
          method: 'POST',
          body: datosClase
        })
        setMensaje('Clase creada correctamente')

        await Swal.fire({
          title: 'Clase creada',
          text: 'La clase se ha añadido correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
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
      fecha: clase.fecha ? new DateObject(clase.fecha).format('YYYY-MM-DD') : '',
      hora_inicio: clase.hora_inicio || '',
      hora_fin: clase.hora_fin || '',
      plazas: clase.plazas || ''
    })
    setMensaje('Editando clase seleccionada')
  }

  const borrarClase = async (id) => {
    const confirmacion = await Swal.fire({
      title: 'Eliminar clase',
      text: 'Seguro que quieres eliminar esta clase?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (!confirmacion.isConfirmed) return

    setCargando(true)
    setMensaje('')

    try {
      await request(`/clases/${id}`, {
        method: 'DELETE'
      })
      setMensaje('Clase eliminada correctamente')

      await Swal.fire({
        title: 'Clase eliminada',
        text: 'La clase se ha eliminado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })

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
    manejarCambioFecha,
    manejarCambioHora,
    guardarClase,
    limpiarFormulario,
    seleccionarClaseParaEditar,
    borrarClase
  }
}
