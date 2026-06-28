import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuth } from './useAuth'
import { useFetch } from '../../hooks/useFetch'

export const useRegistro = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { request } = useFetch()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  const registrar = async (evento) => {
    evento.preventDefault()
    setCargando(true)
    setMensaje('')

    try {
      const resultado = await request('/auth/register', {
        method: 'POST',
        body: { nombre, email, contrasena }
      })

      login(resultado.data, resultado.token)

      navigate('/')
    } catch (error) {
      setMensaje(error.message)
    } finally {
      setCargando(false)
    }
  }

  return {
    nombre,
    setNombre,
    email,
    setEmail,
    contrasena,
    setContrasena,
    mensaje,
    cargando,
    registrar
  }
}
