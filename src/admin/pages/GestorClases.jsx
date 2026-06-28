import { FormularioClase } from '../components/FormularioClase'
import { TablaClases } from '../components/TablaClases'
import { useGestorClases } from '../hooks/useGestorClases'

export const GestorClases = () => {
  const gestorClases = useGestorClases()

  return (
    <section>
      <h2>Gestionar clases</h2>

      <FormularioClase
        formulario={gestorClases.formulario}
        claseEditando={gestorClases.claseEditando}
        cargando={gestorClases.cargando}
        manejarCambio={gestorClases.manejarCambio}
        manejarCambioFecha={gestorClases.manejarCambioFecha}
        manejarCambioHora={gestorClases.manejarCambioHora}
        guardarClase={gestorClases.guardarClase}
        limpiarFormulario={gestorClases.limpiarFormulario}
      />

      {gestorClases.mensaje && <p>{gestorClases.mensaje}</p>}

      <TablaClases
        clases={gestorClases.clases}
        cargando={gestorClases.cargando}
        seleccionarClaseParaEditar={gestorClases.seleccionarClaseParaEditar}
        borrarClase={gestorClases.borrarClase}
      />
    </section>
  )
}
