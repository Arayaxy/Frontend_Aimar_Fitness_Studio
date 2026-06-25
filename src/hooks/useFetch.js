import { useEffect, useState } from "react";

export const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`http://localhost:3000/api${url}`, {
                    ...options,
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }

                const result = await res.json();
                setData(result);
            } catch (err) {
                // Ignore abort errors
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup: cancel the request if component unmounts
        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
};


