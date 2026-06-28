import { useEffect, useState } from "react";

export const useFetch = (url = null, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (endpoint, config = {}) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token')

            const headers = {
                'Content-Type': 'application/json',
                ...config.headers
            }

            if (token) {
                headers.Authorization = `Bearer ${token}`
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
                method: config.method || 'GET',
                headers,
                body: config.body ? JSON.stringify(config.body) : undefined
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.msg || `Error: ${res.status}`)
            }

            setData(result)
            return result
        } catch (error) {
            console.log(error)
            setError(error.message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!url) return

        const fetchData = async () => {
            await request(url, options)
        }

        fetchData()
    }, [url])

    return { data, loading, error, request }
}
