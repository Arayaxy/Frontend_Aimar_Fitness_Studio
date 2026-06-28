import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../auth/hooks/useAuth"
import Swal from "sweetalert2"

export const NavBar = () => {
    const navigate = useNavigate()
    const { isAuthenticated, isAdmin, logout } = useAuth()

    const cerrarSesion = async () => {
        const confirmacion = await Swal.fire({
            title: 'Cerrar sesión',
            text: '¿Seguro que quieres cerrar sesión?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        })

        if (!confirmacion.isConfirmed) return

        logout()
        navigate('/')
    }

    return (
        <nav className="navegacion">
            <ul className="navegacion__lista">
                {!isAdmin && (
                    <>
                        <li className="navegacion__item">
                            <NavLink className="navegacion__enlace" to={'/'}>
                                Inicio
                            </NavLink>
                        </li>
                        <li className="navegacion__item">
                            <NavLink className="navegacion__enlace" to={'/servicios'}>
                                Servicios
                            </NavLink>
                        </li>
                        <li className="navegacion__item">
                            <NavLink className="navegacion__enlace" to={'/contacto'}>
                                Contacto
                            </NavLink>
                        </li>
                        <li className="navegacion__item">
                            <NavLink className="navegacion__enlace" to={'/quienes-somos'}>
                                Quiénes somos
                            </NavLink>
                        </li>
                    </>
                )}
                {isAdmin && (
                    <li className="navegacion__item">
                        <NavLink className="navegacion__enlace" to={'/admin'}>
                            Panel de control
                        </NavLink>
                    </li>
                )}
                {isAuthenticated && !isAdmin && (
                    <li className="navegacion__item">
                        <NavLink className="navegacion__enlace" to={'/area-usuarios'}>
                            Mi área
                        </NavLink>
                    </li>
                )}
            </ul>

            <ul className="navegacion__acciones">
                {isAuthenticated ? (
                    <li className="navegacion__item">
                        <button className="boton boton--secundario" type="button" onClick={cerrarSesion}>
                            Cerrar sesión
                        </button>
                    </li>
                ) : (
                    <>
                        <li className="navegacion__item">
                            <NavLink className="navegacion__enlace" to={'/login'} >
                                Iniciar sesión
                            </NavLink>
                        </li>

                        <li className="navegacion__item">
                            <NavLink className="boton boton--principal" to={'/registro'}>
                                Registro
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
