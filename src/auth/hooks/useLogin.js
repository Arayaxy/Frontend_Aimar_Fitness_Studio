import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from './useAuth'
import { useFetch } from '../../hooks/useFetch'

export const useLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { request } = useFetch()

  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

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
