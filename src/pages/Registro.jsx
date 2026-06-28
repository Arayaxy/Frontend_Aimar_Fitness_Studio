import { useRegistro } from '../auth/hooks/useRegistro'

export const Registro = () => {
  const {
    nombre,
    setNombre,
    email,
    setEmail,
    contrasena,
    setContrasena,
    mensaje,
    cargando,
    registrar
  } = useRegistro()

  return (
    <section className="auth">
      <div className="auth__contenedor">
        <h1 className="auth__titulo">Crear una cuenta</h1>
        <p className="auth__texto">Regístrate para reservar clases y consultar tu calendario.</p>

        <form className="formulario" onSubmit={registrar}>
          <div className="formulario__campo">
            <label className="formulario__etiqueta" htmlFor="nombre">Nombre</label>
            <input
              className="formulario__input"
              id="nombre"
              type="text"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              minLength="2"
              maxLength="20"
              required
            />
          </div>

          <div className="formulario__campo">
            <label className="formulario__etiqueta" htmlFor="registro-email">Correo electrónico</label>
            <input
              className="formulario__input"
              id="registro-email"
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              required
            />
          </div>

          <div className="formulario__campo">
            <label className="formulario__etiqueta" htmlFor="registro-contrasena">Contraseña</label>
            <input
              className="formulario__input"
              id="registro-contrasena"
              type="password"
              value={contrasena}
              onChange={(evento) => setContrasena(evento.target.value)}
              minLength="8"
              required
            />
          </div>

          <button className="boton boton--principal formulario__boton" type="submit" disabled={cargando}>
            {cargando ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>

        {mensaje && <p className="auth__mensaje">{mensaje}</p>}
      </div>
    </section>
  )
}
