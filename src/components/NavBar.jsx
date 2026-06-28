import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../auth/hooks/useAuth"
import Swal from "sweetalert2"

export const NavBar = () => {
    const navigate = useNavigate()
    const { isAuthenticated, isAdmin, logout } = useAuth()

    const cerrarSesion = async () => {
        const confirmacion = await Swal.fire({
            title: 'Cerrar sesion',
            text: 'Seguro que quieres cerrar sesion?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Si, salir',
            cancelButtonText: 'Cancelar'
        })

        if (!confirmacion.isConfirmed) return

        logout()
        navigate('/')
    }

    return (
        <>

            <nav>
                <ul>
                    {!isAdmin && (
                        <>
                            <li>
                                <NavLink to={'/'}>
                                    Inicio
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/servicios'}>
                                    Servicios
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/contacto'}>
                                    Contacto
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/quienes-somos'}>
                                    Quienes Somos
                                </NavLink>
                            </li>
                        </>
                    )}
                    {isAdmin && (
                        <li>
                            <NavLink to={'/admin'}>
                                Panel de control
                            </NavLink>
                        </li>
                    )}
                    {isAuthenticated && !isAdmin && (
                        <li>
                            <NavLink to={'/area-usuarios'}>
                                Mi Area
                            </NavLink>
                        </li>
                    )}


                </ul>

                <ul>
                    {isAuthenticated ? (
                        <li>
                            <button type="button" onClick={cerrarSesion}>
                                Log out
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <NavLink to={'/login'} >
                                    Log in
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/registro'}>
                                    Registro
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>



        </>
    )
}
