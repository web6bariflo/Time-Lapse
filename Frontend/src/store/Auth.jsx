import axios from 'axios';
import { useEffect, useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // ✅ reactive state

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setIsLoggedIn(true); // ✅ explicitly update
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setIsLoggedIn(false); // ✅ explicitly update
  };

  const userAuthentication = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/userdata", {
        headers: { Authorization: authorizationToken },
      });

      if (response.status === 200) {
        setUser(response.data.userData);
      } else {
        console.log("Error in fetching user data");
      }
    } catch (error) {
      console.log("User data not found:", error);
      logoutUser(); // optional: force logout if token invalid
    }
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      userAuthentication();
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ storeTokenInLS, logoutUser, isLoggedIn, user, authorizationToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
