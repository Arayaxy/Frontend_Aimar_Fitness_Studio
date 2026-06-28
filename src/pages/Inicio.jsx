import { useNavigate } from 'react-router'
import local from '../assets/IMG_5619.jpg'
import entrenamiento from '../assets/IMG_5714.jpg'

export const Inicio = () => {
  const navigate = useNavigate()

  return (
    <div className="inicio">
      <section className="inicio-portada">
        <div className="inicio-portada__contenido">
          <h1 className="inicio-portada__titulo">Aimar Fitness Studio</h1>
          <p className="inicio-portada__texto">
            Entrenamiento personal, clases grupales y seguimiento online.
          </p>

          <button className="boton boton--principal inicio-portada__boton" type="button" onClick={() => { navigate('/servicios') }}>
            Ver servicios
          </button>

          <button className="boton boton--secundario inicio-portada__boton" type="button" onClick={() => { navigate('/area-usuarios') }}>
            Reservar clase
          </button>
        </div>

        <img className="inicio-portada__imagen" src={entrenamiento} alt="Entrenamiento en Aimar Fitness Studio" />
      </section>

      <section className="inicio-servicios">
        <h2 className="inicio-servicios__titulo">Servicios</h2>

        <div className="inicio-servicios__lista">
          <article className="inicio-servicios__tarjeta">
            <h3 className="inicio-servicios__tarjeta-titulo">Entrenamiento individual</h3>
            <p className="inicio-servicios__tarjeta-texto">Sesiones adaptadas a tu objetivo, nivel y ritmo.</p>
            <button className="boton boton--secundario inicio-servicios__boton" type="button" onClick={() => { navigate('/servicios') }}>
              Ver más
            </button>
          </article>

          <article className="inicio-servicios__tarjeta">
            <h3 className="inicio-servicios__tarjeta-titulo">Entrenamiento grupal</h3>
            <p className="inicio-servicios__tarjeta-texto">Clases dinámicas para entrenar con energía y constancia.</p>
            <button className="boton boton--principal inicio-servicios__boton" type="button" onClick={() => { navigate('/area-usuarios') }}>
              Reservar
            </button>
          </article>

          <article className="inicio-servicios__tarjeta">
            <h3 className="inicio-servicios__tarjeta-titulo">Entrenamiento online</h3>
            <p className="inicio-servicios__tarjeta-texto">Planificación y seguimiento para entrenar desde donde quieras.</p>
            <button className="boton boton--secundario inicio-servicios__boton" type="button" onClick={() => { navigate('/contacto') }}>
              Consultar
            </button>
          </article>
        </div>
      </section>

      <section className="inicio-local">
        <h2 className="inicio-local__titulo">Local</h2>
        <p className="inicio-local__texto">
          Un espacio preparado para entrenar con comodidad, control y buen ambiente.
        </p>
        <img className="inicio-local__imagen" src={local} alt="Local de Aimar Fitness Studio" />
      </section>
    </div>
  )
}
