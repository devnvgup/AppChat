import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth} from "../firebase/config";
export const AuthContext = createContext();
function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const unsubcribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        navigate("/chatroom");
      } else {
        navigate("/login");
      }
    });
    //clean function
    return () => {
      unsubcribed();
    };
  },[navigate]);
  return (
    <AuthContext.Provider value={{ user}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
