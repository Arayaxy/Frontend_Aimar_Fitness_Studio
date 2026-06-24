import DataTable from 'react-data-table-component'

export const TablaClases = ({
  clases,
  cargando,
  seleccionarClaseParaEditar,
  borrarClase
}) => {
  const columnas = [
    {
      name: 'Título',
      selector: (clase) => clase.titulo,
      sortable: true
    },
    {
      name: 'Descripción',
      selector: (clase) => clase.descripcion,
      sortable: true
    },
    {
      name: 'Fecha',
      selector: (clase) => clase.fecha,
      sortable: true
    },
    {
      name: 'Inicio',
      selector: (clase) => clase.hora_inicio
    },
    {
      name: 'Fin',
      selector: (clase) => clase.hora_fin
    },
    {
      name: 'Plazas',
      selector: (clase) => clase.plazas,
      sortable: true
    },
    {
      name: 'Entrenador',
      selector: (clase) => clase.entrenador_id,
      sortable: true
    },
    {
      name: 'Acciones',
      cell: (clase) => (
        <div>
          <button onClick={() => { seleccionarClaseParaEditar(clase) }}>
            Actualizar
          </button>
          <button onClick={() => { borrarClase(clase.id) }}>
            Eliminar
          </button>
        </div>
      )
    }
  ]

  return (
    <DataTable
      title="Listado de clases"
      columns={columnas}
      data={clases}
      pagination
      highlightOnHover
      progressPending={cargando}
      noDataComponent="No hay clases disponibles"
    />
  )
}
