import { useState } from 'react'
import { AuthContext } from './AuthContext'

/**
 * Recupera el usuario guardado en localStorage.
 * Si el JSON esta corrupto, limpia la sesion para evitar estados inconsistentes.
 *
 * @returns {object|null} Usuario guardado o null si no hay sesion valida.
 */
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

/**
 * Proveedor global de autenticacion.
 * Guarda token, usuario y funciones de login/logout para toda la aplicacion.
 *
 * @param {{children: import('react').ReactNode}} props - Componentes hijos que podran usar el contexto.
 * @returns {import('react').JSX.Element}
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [usuario, setUsuario] = useState(obtenerUsuarioGuardado)

  /**
   * Guarda la sesion despues de login o registro correcto.
   *
   * @param {object} datosUsuario - Datos publicos del usuario.
   * @param {string} nuevoToken - JWT recibido desde el backend.
   * @returns {void}
   */
  const login = (datosUsuario, nuevoToken) => {
    localStorage.setItem('token', nuevoToken)
    localStorage.setItem('usuario', JSON.stringify(datosUsuario))

    setToken(nuevoToken)
    setUsuario(datosUsuario)
  }

  /**
   * Cierra la sesion borrando datos locales y estado de React.
   *
   * @returns {void}
   */
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
