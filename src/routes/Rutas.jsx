import { Routes, Route, Navigate } from 'react-router'
import { Contacto, Inicio, Login, QuienesSomos, Registro, Servicios } from '../pages/index'
import { HomePageAdmin } from '../admin/pages/HomePageAdmin'
import { GestorClases } from '../admin/pages/GestorClases'
import { GestorCalendario } from '../admin/pages/GestorCalendario'
import { GestorUsuarios } from '../admin/pages/GestorUsuarios'
import { RutaAdmin } from '../admin/components/RutaAdmin'


export const Rutas = () => {
    return (
        <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/servicios' element={<Servicios />} />
            <Route path='/login' element={<Login />} />
            <Route path='/quienes-somos' element={<QuienesSomos />} />
            <Route path='/registro' element={<Registro />} />
            <Route path='/contacto' element={<Contacto />} />


            {/*rutas privadas admin*/}

            <Route path='/admin' element={
                <RutaAdmin>
                    <HomePageAdmin />
                </RutaAdmin>
            } />
            <Route path='/admin/clases' element={
                <RutaAdmin>
                    <GestorClases />
                </RutaAdmin>
            } />
            <Route path='/admin/calendario' element={
                <RutaAdmin>
                    <GestorCalendario />
                </RutaAdmin>
            } />
            <Route path='/admin/usuarios' element={
                <RutaAdmin>
                    <GestorUsuarios />
                </RutaAdmin>
            } />


            {/*rutas privadas usuario Registrado*/}


            <Route path='/*' element={<Navigate to={'/'} />} />

        </Routes>
    )
}

