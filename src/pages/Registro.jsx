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
    <section>
      <h1>Crear una cuenta</h1>

      <form onSubmit={registrar}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
          minLength="2"
          maxLength="20"
          required
        />

        <label htmlFor="registro-email">Correo electrónico</label>
        <input
          id="registro-email"
          type="email"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          required
        />

        <label htmlFor="registro-contrasena">Contraseña</label>
        <input
          id="registro-contrasena"
          type="password"
          value={contrasena}
          onChange={(evento) => setContrasena(evento.target.value)}
          minLength="8"
          required
        />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </section>
  )
}
