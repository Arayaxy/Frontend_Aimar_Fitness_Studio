import { NavLink } from "react-router"

export const NavBar = () => {
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
                            Quienes Somo
                        </NavLink>
                    </li>

                </ul>

                <ul>
                    <button>
                        <NavLink to={'/login'} >
                            Log in
                        </NavLink>
                    </button>
                    <button>
                        <NavLink to={'/registro'}>
                            Registro
                        </NavLink>
                    </button>
                </ul>
            </nav>



        </>
    )
}
