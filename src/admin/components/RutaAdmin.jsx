import { Navigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

/**
 * Protege paginas exclusivas del panel de administracion.
 * Primero exige sesion y despues comprueba que el usuario tenga rol admin.
 *
 * @param {{children: import('react').ReactNode}} props - Pagina de admin protegida.
 * @returns {import('react').JSX.Element|import('react').ReactNode}
 */
export const RutaAdmin = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (!isAdmin) {
    return <Navigate to="/" />
  }

  return children
}
