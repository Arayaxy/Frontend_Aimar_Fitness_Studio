import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * Acceso corto al contexto de autenticacion.
 * Permite leer usuario, token y funciones login/logout desde cualquier componente.
 *
 * @returns {object} Valores publicados por AuthProvider.
 */
export const useAuth = () => useContext(AuthContext)
