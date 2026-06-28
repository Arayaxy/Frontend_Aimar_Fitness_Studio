import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

/**
 * Protege paginas que solo puede ver un usuario con sesion iniciada.
 * Si no hay sesion, redirige al login.
 *
 * @param {{children: import('react').ReactNode}} props - Pagina protegida.
 * @returns {import('react').JSX.Element|import('react').ReactNode}
 */
export const RutaPrivadaUsuario = ({ children }) => {
 const { isAuthenticated } = useAuth()
    
if (!isAuthenticated) {
    return <Navigate to= "/login" />
}
 
return children
}
