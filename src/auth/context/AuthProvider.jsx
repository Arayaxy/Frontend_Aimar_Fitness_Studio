import { useState } from 'react'
import { AuthContext } from './AuthContext'

const obtenerUsuarioGuardado = () => {
  const usuarioGuardado = localStorage.getItem('usuario')

  if (!usuarioGuardado) return null

  try {
    return JSON.parse(usuarioGuardado)
  } catch {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')

    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [usuario, setUsuario] = useState(obtenerUsuarioGuardado)

  const login = (datosUsuario, nuevoToken) => {
    localStorage.setItem('token', nuevoToken)
    localStorage.setItem('usuario', JSON.stringify(datosUsuario))

    setToken(nuevoToken)
    setUsuario(datosUsuario)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')

    setToken(null)
    setUsuario(null)
  }

  const isAuthenticated = Boolean(token && usuario)
  const isAdmin = usuario?.rol === 'admin'

  return (
    <AuthContext.Provider value={{
      token,
      usuario,
      login,
      logout,
      isAuthenticated,
      isAdmin
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
