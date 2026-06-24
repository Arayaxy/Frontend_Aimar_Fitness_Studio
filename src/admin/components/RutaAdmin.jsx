import { Navigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

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
