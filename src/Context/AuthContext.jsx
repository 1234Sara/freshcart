import { useEffect } from "react";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export default function AuthContextProvider({children}) {
    
    const [token, setToken] = useState(null);

    const [userId, setUserId] = useState(null); 

    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          setToken(token); 
        //     const decoded = jwtDecode(token); 
        //         if (decoded.id) {
        //       setUserId(decoded.id); 
        //       localStorage.setItem("userId", decoded.id);
        //   } 
        try {
            const decoded = jwtDecode(token); 
    
            if (decoded.id) {
              setUserId(decoded.id); 
              localStorage.setItem("userId", decoded.id); 
            } 
          } 
          catch (error) {
            // console.error("Error decoding token:", error); 
          }
        }
    
    }, [])
    
    // useEffect(() => {
    //     const token = localStorage.getItem("token");

    //     if (token) {
    //       setToken(token); // Set token in state
    
    //       try {
    //         const decoded = jwtDecode(token); // Decode the token
    
    //         if (decoded.id) {
    //           setUserId(decoded.id); // Set userId in state
    //           localStorage.setItem("userId", decoded.id); // Save userId to localStorage
    //         } 
    //         // else {
    //         //   console.error("User ID is missing in the token"); // Debugging
    //         // }
    //       } 
    //       catch (error) {
    //         console.error("Error decoding token:", error); // Debugging
    //       }
    //     }
    //   }, []); // Run this effect only once on initial render
    

    return <AuthContext.Provider value={ {token, setToken, userId, setUserId} }>
        {children}
    </AuthContext.Provider>
}



