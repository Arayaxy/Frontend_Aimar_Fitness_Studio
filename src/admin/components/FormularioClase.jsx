import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const FormularioClase = ({
  formulario,
  claseEditando,
  cargando,
  manejarCambio,
  manejarCambioFecha,
  manejarCambioHora,
  guardarClase,
  limpiarFormulario
}) => {
  const fechaSeleccionada = formulario.fecha
    ? new Date(`${formulario.fecha}T00:00`)
    : null

  const horaInicioSeleccionada = formulario.hora_inicio
    ? new Date(`2000-01-01T${formulario.hora_inicio}`)
    : null

  const horaFinSeleccionada = formulario.hora_fin
    ? new Date(`2000-01-01T${formulario.hora_fin}`)
    : null

  return (
    <form onSubmit={guardarClase}>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={formulario.titulo}
        onChange={manejarCambio}
        required
      />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formulario.descripcion}
        onChange={manejarCambio}
      />

      <DatePicker
        selected={fechaSeleccionada}
        onChange={manejarCambioFecha}
        dateFormat="dd/MM/yyyy"
        placeholderText="Fecha"
        required
      />

      <DatePicker
        selected={horaInicioSeleccionada}
        onChange={(hora) => { manejarCambioHora('hora_inicio', hora) }}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Inicio"
        dateFormat="HH:mm"
        placeholderText="Hora inicio"
        required
      />

      <DatePicker
        selected={horaFinSeleccionada}
        onChange={(hora) => { manejarCambioHora('hora_fin', hora) }}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Fin"
        dateFormat="HH:mm"
        placeholderText="Hora fin"
        required
      />

      <input
        type="number"
        name="plazas"
        placeholder="Plazas"
        value={formulario.plazas}
        onChange={manejarCambio}
        required
      />

      <button type="submit" disabled={cargando}>
        {claseEditando ? 'Actualizar clase' : 'Crear clase'}
      </button>

      {claseEditando && (
        <button type="button" onClick={limpiarFormulario}>
          Cancelar edición
        </button>
      )}
    </form>
  )
}
