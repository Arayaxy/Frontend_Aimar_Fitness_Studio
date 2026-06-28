import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from './useAuth'
import { useFetch } from '../../hooks/useFetch'

/**
 * Maneja el formulario de login.
 * Guarda los campos, llama al backend y redirige segun el rol del usuario.
 *
 * @returns {object} Estado y acciones que usa la pagina de login.
 */
export const useLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { request } = useFetch()

  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  /**
   * Envia email y contrasena al backend para iniciar sesion.
   *
   * @param {React.FormEvent<HTMLFormElement>} evento - Evento del formulario.
   * @returns {Promise<void>}
   */
  const iniciarSesion = async (evento) => {

    evento.preventDefault()

    setCargando(true)

    setMensaje('')

    try {
      const resultado = await request('/auth/login', {
        method: 'POST',
        body: { email, contrasena }
      })

      login(resultado.data, resultado.token)

      if (resultado.data.rol === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (error) {
      setMensaje(error.message)
    } finally {
      setCargando(false)
    }
  }

  return {
    email,
    setEmail,
    contrasena,
    setContrasena,
    mensaje,
    cargando,
    iniciarSesion
  }
}
