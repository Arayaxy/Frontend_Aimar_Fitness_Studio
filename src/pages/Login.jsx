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
    <section>
      <h1>Iniciar sesión</h1>

      <form onSubmit={iniciarSesion}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          required
        />

        <label htmlFor="contrasena">Contraseña</label>
        <input
          id="contrasena"
          type="password"
          value={contrasena}
          onChange={(evento) => setContrasena(evento.target.value)}
          required
        />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </section>
  )
}
