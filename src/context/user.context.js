import React,{ createContext,useState,useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {


  const [user] = useState(false);
  
  return (
    <UserContext.Provider value={user}>
            {children}
    </UserContext.Provider>
  )

}

export const useUser = () => useContext(UserContext)