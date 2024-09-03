import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn: any) => {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn();
            setData(response);
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Be careful u use fetch data as callback otherwise it cause infine loop
    const refetch = () => fetchData();

    return { data, isLoading, refetch };
};

export default useAppwrite;
