import { useNavigate } from 'react-router'

export const HomePageAdmin = () => {
  const navigate = useNavigate()

  return (
    <>
      <h1>Panel de administración</h1>

      <div className="FlexContainer">
        <button onClick={() => { navigate('/admin/clases') }}>
          Clases
        </button>

        <button onClick={() => { navigate('/admin/calendario') }}>
          Calendario
        </button>

        <button onClick={() => { navigate('/admin/usuarios') }}>
          Usuarios
        </button>
      </div>
    </>
  )
}
