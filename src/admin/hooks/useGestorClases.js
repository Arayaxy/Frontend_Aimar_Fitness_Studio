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

/**
 * Centraliza la logica del panel admin para crear, editar, listar y borrar clases.
 * Asi los componentes solo se encargan de mostrar formularios y tablas.
 *
 * @returns {object} Estado del gestor de clases y funciones para modificarlo.
 */
export const useGestorClases = () => {
  const { request } = useFetch()
  const [clases, setClases] = useState([])
  const [formulario, setFormulario] = useState(formularioInicial)
  const [claseEditando, setClaseEditando] = useState(null)
  const [mensaje, setMensaje] = useState('Cargando clases...')
  const [cargando, setCargando] = useState(false)

  /**
   * Trae las clases desde el backend y actualiza la tabla.
   *
   * @returns {Promise<void>}
   */
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

  /**
   * Actualiza un campo de texto del formulario usando su atributo name.
   *
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} evento - Evento del campo modificado.
   * @returns {void}
   */
  const manejarCambio = (evento) => {
    const { name, value } = evento.target

    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  /**
   * Guarda la fecha en formato YYYY-MM-DD, que es el formato que espera la API.
   *
   * @param {Date|DateObject|null} fecha - Fecha elegida en el calendario.
   * @returns {void}
   */
  const manejarCambioFecha = (fecha) => {
    setFormulario({
      ...formulario,
      fecha: fecha ? new DateObject(fecha).format('YYYY-MM-DD') : ''
    })
  }

  /**
   * Convierte una hora de JavaScript al formato HH:mm y la guarda en el formulario.
   *
   * @param {string} name - Nombre del campo que se va a actualizar.
   * @param {Date|null} hora - Hora elegida por el usuario.
   * @returns {void}
   */
  const manejarCambioHora = (name, hora) => {
    const horaFormateada = hora
      ? `${String(hora.getHours()).padStart(2, '0')}:${String(hora.getMinutes()).padStart(2, '0')}`
      : ''

    setFormulario({
      ...formulario,
      [name]: horaFormateada
    })
  }

  /**
   * Deja el formulario listo para crear una clase nueva.
   *
   * @returns {void}
   */
  const limpiarFormulario = () => {
    setFormulario(formularioInicial)
    setClaseEditando(null)
  }

  /**
   * Adapta los datos del formulario antes de enviarlos al backend.
   *
   * @returns {object} Datos de clase con plazas como numero y entrenador_id incluido.
   */
  const prepararDatosClase = () => ({
    ...formulario,
    plazas: Number(formulario.plazas),
    entrenador_id: ENTRENADOR_ID
  })

  /**
   * Crea una clase nueva o actualiza la clase seleccionada para editar.
   *
   * @param {React.FormEvent<HTMLFormElement>} evento - Evento del formulario.
   * @returns {Promise<void>}
   */
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

  /**
   * Carga una clase existente en el formulario para poder editarla.
   *
   * @param {object} clase - Clase seleccionada desde la tabla.
   * @returns {void}
   */
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

  /**
   * Pide confirmacion y borra una clase del backend.
   *
   * @param {number|string} id - ID de la clase a eliminar.
   * @returns {Promise<void>}
   */
  const borrarClase = async (id) => {
    const confirmacion = await Swal.fire({
      title: 'Eliminar clase',
      text: '¿Seguro que quieres eliminar esta clase?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
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
