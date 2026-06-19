import { NavLink } from "react-router"

export const NavBar = () => {
    return (
        <>
            <header>
                <img src="" alt="" />
                <nav>
                    <ul>
                        <li>
                            <NavLink to={'/'}>
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Servicios'}>
                                Servicios
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Contacto'}>
                                Contacto
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/QuienesSomos'}>
                                Quienes Somo
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </header>
            <button>
                <NavLink to={'/Login'} >
                    Log in
                </NavLink>
            </button>
            <button>
                <NavLink to={'/Registro'}>
                    Registro
                </NavLink>
            </button>

        </>
    )
}
