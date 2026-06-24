import { useState } from 'react'
import { useNavigate } from 'react-router'
import { loginUsuario } from '../../services/api'
import { useAuth } from './useAuth'

export const useLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  const iniciarSesion = async (evento) => {
    evento.preventDefault()
    setCargando(true)
    setMensaje('')

    try {
      const resultado = await loginUsuario(email, contrasena)

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
