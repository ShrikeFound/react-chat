import React,{ createContext,useState,useContext, useEffect } from "react";
import { auth, db } from "../misc/firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {


  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true)
  

  useEffect(() => {
    
    let userRef;

    const authUnsubscribe =auth.onAuthStateChanged(authObject => {
      
      if (authObject) {
        
        userRef = userRef = db.ref(`/users/${authObject.uid}`);
        userRef.on('value', (snapshot) => {
          const {name,createdAt,avatar} = snapshot.val();
          
          const userData = {
            uid: authObject.uid,
            email: authObject.email,
            name,
            createdAt,
            avatar
          }  

          setUser(userData);
          setLoading(false);

        })

      } else {
        if (userRef) {
          userRef.off();
        }
        setUser(null);
        setLoading(false);
      }
    })

    return () => {
      authUnsubscribe();

      if (userRef) {
          userRef.off();
      }
    }


  },[])

  return (
    <UserContext.Provider value={{loading,user}}>
            {children}
    </UserContext.Provider>
  )

}

export const useUser = () => useContext(UserContext)