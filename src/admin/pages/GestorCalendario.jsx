
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import DateObject from "react-date-object"
/* 
Buscar biblioteca de calendario (React big calendar)
        una vez eleguida comprobar que pinte en el componente un calendario simple
            luego conectarla  a añadir la clase se cargue en el dia especifico 
                y asi se cargue con la informacion que tenemos 

                // Hacer  imports necesarios (estilos),
                // crear el localizodor
                // crear el evento para que pinte las clases


*/
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
export const GestorCalendario = () => {

    const [view, setView] = useState('week')
    const [date, setDate] = useState(new Date(2026, 5, 24))

    const { data, loading, error } = useFetch('/clases')

    const eventosCalendario = data?.data.map(clase => {
        const fecha = new DateObject(clase.fecha).format("YYYY-MM-DD")

        return {
            title: clase.titulo,
            start: new Date(`${fecha}T${clase.hora_inicio}`),
            end: new Date(`${fecha}T${clase.hora_fin}`)
        }
    }) || []


    return (
        <section>
            {loading && 'Cargando'}
            {error && console.log(error)}

            <h2>Gestionar calendario</h2>
            <Calendar
                localizer={localizer}
                events={eventosCalendario}
                views={['month', 'week', 'day', 'agenda']}
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                messages={{
                    today: 'Hoy',
                    month: 'mensual',
                    week: 'semanal',
                    next: 'siguiente'
                }}
            />
        </section>
    )
}
