import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext.jsx";  // ✅ FIXED IMPORT

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext); // ✅ Now defined

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getCurrentUser`, { withCredentials: true });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.log("get current user error", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = { userData, setUserData, getCurrentUser };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
