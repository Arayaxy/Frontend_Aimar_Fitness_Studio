import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from "date-fns"
import { es } from "date-fns/locale"
import { useContext, useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { AuthContext } from "../auth/context/AuthContext"

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
    const { data, loading, error } = useFetch(`/reservas/${usuario.id}`)

    const reservasCalendario = data?.data.map(reservas => ({
        title: reservas.titulo,
        start: new Date(`${reservas.fecha.slice(0, 10)}T${reservas.hora_inicio}`),
        end: new Date(`${reservas.fecha.slice(0, 10)}T${reservas.hora_fin}`),
    })) || []
    console.log(reservasCalendario)

   
    return (
        <section>

            {loading && 'cargando'}
            {error && console.log(error)}
            
            <h2>Mi Area Personal</h2>
            <p> BIenvenido ${ }</p>

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
                messages={{
                    today: 'Hoy',
                    month: 'mensual',
                    week: 'semanal',
                    next: 'siguiente',

                }}
            />

        </section>






        /*
        

        1- conseguir que se pinte el calendario completo sin reservas 
        (mirar si se puede modificar el horario para que sea de 9am a 9pm para reducir el tamaño del calendario)

            -impottar big calendar es el componente que pintara el calendario

        2- hacer que se pinten las reservas por id de cada usuario 

        3- una vez que tengamos toodas las reservas de cada usuario  al clicar en el calendario 
        que aparezca un boton de eliminar reserva incluir sweet alert para avisos (desea eliminar esta clase ) 
        (mas adelante incluir modificar  reserva).

        */

        /* 
        1- hacer que se pinte la tabla vacia
        2- hacer que se pinten las clases que estan metidas en el calendario general 
        3- añadirle el boton de reservar 
        4 cuando se de al boton de reservar la clase se añade al calendario superior 
        
        */
    )
}
