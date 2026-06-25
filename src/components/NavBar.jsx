import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../auth/hooks/useAuth"

export const NavBar = () => {
    const navigate = useNavigate()
    const { isAuthenticated, isAdmin, logout } = useAuth()

    const cerrarSesion = () => {
        logout()
        navigate('/')
    }

    return (
        <>

            <nav>
                <ul>
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
                    {isAdmin && (
                        <li>
                            <NavLink to={'/admin'}>
                                Panel de control
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
