import { Routes, Route, Navigate } from 'react-router'
import { Contacto, Inicio, Login, QuienesSomos, Registro, Servicios } from '../pages/index'


export const Rutas = () => {
    return (
        <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/Servicios' element={<Servicios />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/QuienesSomos' element={<QuienesSomos />} />
            <Route path='/Registro' element={<Registro />} />
            <Route path='/Contacto' element={<Contacto />} />

            <Route path='/*' element={<Navigate to={'/'} />} />

        </Routes>
    )
}

