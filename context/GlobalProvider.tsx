import { getCurrentUser } from "@/lib/appwrite";
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

// 1. GlobalContext oluşturma
const GlobalContext = createContext<any>(null);

// 2. useGlobalContext hook'u ile context'i kullanıma sunun
export const useGlobalContext = () => useContext(GlobalContext);

// 3. GlobalProvider bileşenini oluşturun ve value prop'unu sağlayın
interface GlobalProviderProps {
    children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res: any) => {
                setIsLoading(true);
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
