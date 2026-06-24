export const FormularioClase = ({
  formulario,
  claseEditando,
  cargando,
  manejarCambio,
  guardarClase,
  limpiarFormulario
}) => {
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

      <input
        type="date"
        name="fecha"
        value={formulario.fecha}
        onChange={manejarCambio}
        required
      />

      <input
        type="time"
        name="hora_inicio"
        value={formulario.hora_inicio}
        onChange={manejarCambio}
        required
      />

      <input
        type="time"
        name="hora_fin"
        value={formulario.hora_fin}
        onChange={manejarCambio}
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

      <input
        type="number"
        name="entrenador_id"
        placeholder="ID del entrenador"
        value={formulario.entrenador_id}
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
