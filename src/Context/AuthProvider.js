import React, { useEffect, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FacebookAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { authen } from '../components/firebase/config'
import { Spin } from 'antd';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const provider = new FacebookAuthProvider();
    authen.languageCode = 'it';
    const [isClick, setClick] = useState(false)
    provider.setCustomParameters({
        'display': 'popup'
    });
    const handleFlag = (flag) => {
        setClick(flag)
    }
    useEffect(() => {
        if (isClick) {
            signInWithPopup(authen, provider)
                .then((result) => {
                    // The signed-in user info.
                    const user = result.user;
                    if (user) {
                        const { displayName, email, uid, photoURL } = user;
                        setUser({
                            displayName, email, uid, photoURL
                        })
                        setIsLoading(false)
                        nav('/')
                    } else {
                        nav('/login')
                    }

                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }, [isClick])

    return (
        <AuthContext.Provider value={{ user, handleFlag }}>
            {isLoading && isClick ? <Spin /> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider