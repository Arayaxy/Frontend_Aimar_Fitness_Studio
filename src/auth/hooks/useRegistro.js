import { useState } from 'react'
import { useNavigate } from 'react-router'
import { registrarUsuario } from '../../services/api'
import { useAuth } from './useAuth'

export const useRegistro = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
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
      const resultado = await registrarUsuario(nombre, email, contrasena)

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
