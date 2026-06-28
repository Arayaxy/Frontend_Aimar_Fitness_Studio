import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from "date-fns"
import { es } from "date-fns/locale"
import { useContext, useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { AuthContext } from "../auth/context/AuthContext"
import DateObject from "react-date-object"
import DataTable from "react-data-table-component"
import Swal from "sweetalert2"

const locales = {
    es
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

export const AreaUsuarios = () => {
    const [view, setView] = useState('week')
    const [date, setDate] = useState(new Date(2026, 5, 24))
    const { usuario } = useContext(AuthContext)

    const { data: dataClases, loading: loadingClases } = useFetch('/clases')
    const {
        data: dataReservas,
        loading: loadingReservas,
        error,
        request: requestReservas
    } = useFetch(usuario ? `/reservas/${usuario.id}` : null)
    const { request: requestAcciones } = useFetch()

    const reservas = dataReservas?.data || []
    const clases = dataClases?.data || []

    const idsClasesReservadas = reservas.map((reserva) => reserva.clase_id)

    const recargarReservas = async () => {
        if (!usuario) return

        await requestReservas(`/reservas/${usuario.id}`)
    }

    const reservarClase = async (clase) => {
        const confirmacion = await Swal.fire({
            title: 'Reservar clase',
            text: `Quieres reservar la clase ${clase.titulo}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Si, reservar',
            cancelButtonText: 'Cancelar'
        })

        if (!confirmacion.isConfirmed) return

        try {
            await requestAcciones(`/reservas/${usuario.id}/${clase.id}`, {
                method: 'POST'
            })

            await recargarReservas()

            await Swal.fire({
                title: 'Clase reservada',
                text: 'La clase se ha reservado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })

        } catch (error) {
            await Swal.fire({
                title: 'No se pudo reservar',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    const eliminarReserva = async (reserva) => {
        const confirmacion = await Swal.fire({
            title: 'Eliminar reserva',
            text: `Quieres eliminar la reserva de ${reserva.title}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        })

        if (!confirmacion.isConfirmed) return

        try {
            await requestAcciones(`/reservas/${reserva.id}`, {
                method: 'DELETE'
            })

            await recargarReservas()

            await Swal.fire({
                title: 'Reserva eliminada',
                text: 'La reserva se ha eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })

        } catch (error) {
            await Swal.fire({
                title: 'No se pudo eliminar',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    const reservasCalendario = reservas.map((reserva) => {
        const fecha = new DateObject(reserva.fecha).format("YYYY-MM-DD")

        return {
            id: reserva.id,
            title: reserva.titulo,
            start: new Date(`${fecha}T${reserva.hora_inicio}`),
            end: new Date(`${fecha}T${reserva.hora_fin}`)
        }
    })

    const columnas = [
        {
            name: 'Clase',
            selector: (clase) => clase.titulo,
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
            name: 'Accion',
            cell: (clase) => {
                const estaReservada = idsClasesReservadas.includes(clase.id)

                return (
                    <button
                        type="button"
                        disabled={estaReservada}
                        onClick={() => { reservarClase(clase) }}
                    >
                        {estaReservada ? 'Reservada' : 'Reservar'}
                    </button>
                )
            }
        }
    ]

    return (
        <section>
            {(loadingClases || loadingReservas) && 'cargando'}
            {error && console.log(error)}

            <h2>Mi Area Personal</h2>
            <p>Bienvenido {usuario?.nombre}</p>

            <DataTable
                title="Clases disponibles"
                columns={columnas}
                data={clases}
                pagination
                highlightOnHover
                progressPending={loadingClases}
                noDataComponent="No hay clases disponibles"
            />

            <Calendar
                localizer={localizer}
                events={reservasCalendario}
                date={date}
                onNavigate={setDate}
                view={view}
                onView={setView}
                views={['month', 'week']}
                startAccessor='start'
                endAccessor='end'
                min={new Date(2026, 0, 1, 9, 0)}
                max={new Date(2026, 0, 1, 21, 0)}
                step={60}
                timeslots={1}
                style={{ height: 600 }}
                onSelectEvent={eliminarReserva}
                messages={{
                    today: 'Hoy',
                    month: 'mensual',
                    previous: 'anterior',
                    week: 'semanal',
                    next: 'siguiente'
                }}
            />
        </section>
    )
}
