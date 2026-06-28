import DataTable from 'react-data-table-component'
import DateObject from 'react-date-object'

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
      selector: (clase) => new DateObject(clase.fecha).format('DD/MM/YYYY'),
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
      selector: () => 'Aimar',
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
