import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
export const RutaPrivadaUsuario = ({ children }) => {
 const { isAuthenticated } = useAuth()
    
if (!isAuthenticated) {
    return <Navigate to= "/login" />
}
 
return children
}
