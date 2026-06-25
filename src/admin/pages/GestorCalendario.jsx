
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"
import { useFetch } from "../../hooks/useFetch"
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

    const eventosCalendario = data?.data.map(clase => ({
        title: clase.titulo,
        start: new Date(`${clase.fecha.slice(0, 10)}T${clase.hora_inicio}`),
        end: new Date(`${clase.fecha.slice(0, 10)}T${clase.hora_fin}`)
    })) || []


    return (
        <section>
            {loading && 'cargando'}
            {error && console.log(error)}

            <h2>Gestionar Calendario</h2>
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
            />
        </section>
    )
}


/* 
Una vez que tengamos  el calnedario funcional  comenzamos con la gestion de reservas del usuario 
    empezando creando la ruta para el usuario registrado a su perfil privado 
    donde podra reservar cita en las clases  donde haya plazas disponibles
        si no hay hay plazas dispoblibles se maca la calse completa en el calendario general 
            si hay plazas disponibles  

*/