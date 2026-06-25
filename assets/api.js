const API_URL = 'http://localhost:3000/api'

const procesarRespuesta = async (respuesta) => {
  const resultado = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(resultado.msg || 'Ha ocurrido un error en la peticion')
  }

  return resultado
}

const obtenerHeadersConToken = () => {
  const token = localStorage.getItem('token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

export const loginUsuario = async (email, contrasena) => {
  const respuesta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, contrasena })
  })

  return procesarRespuesta(respuesta)
}

export const registrarUsuario = async (nombre, email, contrasena) => {
  const respuesta = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, email, contrasena })
  })

  return procesarRespuesta(respuesta)
}

export const obtenerClases = async () => {
  const respuesta = await fetch(`${API_URL}/clases`)

  return procesarRespuesta(respuesta)
}

export const crearClase = async (datosClase) => {
  const respuesta = await fetch(`${API_URL}/clases`, {
    method: 'POST',
    headers: obtenerHeadersConToken(),
    body: JSON.stringify(datosClase)
  })

  return procesarRespuesta(respuesta)
}

export const actualizarClase = async (id, datosClase) => {
  const respuesta = await fetch(`${API_URL}/clases/${id}`, {
    method: 'PATCH',
    headers: obtenerHeadersConToken(),
    body: JSON.stringify(datosClase)
  })

  return procesarRespuesta(respuesta)
}

export const eliminarClase = async (id) => {
  const respuesta = await fetch(`${API_URL}/clases/${id}`, {
    method: 'DELETE',
    headers: obtenerHeadersConToken()
  })

  return procesarRespuesta(respuesta)
}
