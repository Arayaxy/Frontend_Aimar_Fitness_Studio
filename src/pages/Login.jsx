import { useLogin } from '../auth/hooks/useLogin'

export const Login = () => {
  const {
    email,
    setEmail,
    contrasena,
    setContrasena,
    mensaje,
    cargando,
    iniciarSesion
  } = useLogin()

  return (
    <section className="auth">
      <div className="auth__contenedor">
        <h1 className="auth__titulo">Iniciar sesión</h1>
        <p className="auth__texto">Accede a tu área personal para gestionar tus reservas.</p>

        <form className="formulario" onSubmit={iniciarSesion}>
          <div className="formulario__campo">
            <label className="formulario__etiqueta" htmlFor="email">Correo electrónico</label>
            <input
              className="formulario__input"
              id="email"
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              required
            />
          </div>

          <div className="formulario__campo">
            <label className="formulario__etiqueta" htmlFor="contrasena">Contraseña</label>
            <input
              className="formulario__input"
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(evento) => setContrasena(evento.target.value)}
              required
            />
          </div>

          <button className="boton boton--principal formulario__boton" type="submit" disabled={cargando}>
            {cargando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {mensaje && <p className="auth__mensaje">{mensaje}</p>}
      </div>
    </section>
  )
}
