import logoAfs from '../assets/logo-afs.png'

export const Footer = () => {
    return (
        <footer className="pie">
            <div className="pie__contenido">
                <img className="pie__logo" src={logoAfs} alt="Aimar Fitness Studio" />

                <div className="pie__contacto">
                    <p className="pie__texto">Teléfono: 674 256 218</p>
                    <a
                        className="pie__enlace"
                        href="https://www.google.com/maps/place//data=!4m2!3m1!1s0xd51a581614075d1:0x178c631dfdc9c265?sa=X&ved=1t:8290&ictx=111"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Julimasene Kalea, 1C, 20015 Donostia / San Sebastián, Gipuzkoa
                    </a>
                </div>

                <p className="pie__legal">&copy; 2026 Aimar Fitness Studio. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
