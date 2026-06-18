import { NavLink } from "react-router"

export const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={'/'}>
                        Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/'}>
                        Servicio
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/'}>
                        Contacto
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/'}>
                        Sobre nosotros
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
