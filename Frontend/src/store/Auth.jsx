import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(null)
    const authorizationToken = `Bearer ${token}`

    const storeTokenInLS = (jwtToken) => {
        setToken(jwtToken);
        return localStorage.setItem("token", jwtToken)
    }

    const isLoggedIn = !!token;
    console.log("isLoggedIn: ", isLoggedIn);

    const logoutUser = () => {
        setToken("");
        localStorage.removeItem("token")
        setUser(null)
    }

    const userAuthentication = async () => {
        try {
           
            const response = await axios.get("http://localhost:3000/api/auth/userdata", {
                headers: {
                    "Authorization": authorizationToken,
                },
            });
            setUser(response.data.userData)
            if (response.status == 200) {
                
            } else {
                console.log("error in fetching user data");
                
            }
        } catch (error) {
            console.log("user data not found: ", error);
        }
    }

    useEffect(() => {
        if (token) {
            userAuthentication();
        } else {
            setUser(null);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ storeTokenInLS, logoutUser, isLoggedIn, user, authorizationToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if (!authContextValue) {
        throw new Error("useAuth is used out side of the provider")
    }
    return authContextValue;
}