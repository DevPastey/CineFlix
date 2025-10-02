import { useEffect, useState } from "react"

const useFetch = <T,>(fetchFuction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState< T | null >(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState< Error | null >(null);

    const fetchData = async() => {
        try {
         setLoading(true);
         setError(null);

         const result = await fetchFuction();

         setData(result);

        } catch (error) {
            setError(error instanceof Error ? error : new Error("An Error occured"));
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setLoading(false);
        setError(null);
        setData(null);
    }

    useEffect(() => {
        if (autoFetch = true) {
            fetchData();
        }
    }, []);

    return {
        data, loading, error, refetch: fetchData, reset
    };
}


export default useFetch;