import React, { useEffect, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FacebookAuthProvider } from "firebase/auth";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { authen } from '../components/firebase/config'
import { Spin } from 'antd';
import { db } from '../components/firebase/config'
import { collection, addDoc } from "firebase/firestore";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    let isFirstLogin;
    const nav = useNavigate()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isClick, setClick] = useState(false)
    const provider = new FacebookAuthProvider();
    authen.languageCode = 'it';
    provider.setCustomParameters({
        'display': 'popup'
    });
    const handleLogin = (flag) => {
        setClick(flag)
    }
    const handleSignOut = (flag) => {
        setClick(flag)
    }
    useEffect(() => {
        if (isClick) {
            signInWithPopup(authen, provider)
                .then(async (result) => {
                    // The signed-in user info.
                    const user = result.user;
                    isFirstLogin = await getAdditionalUserInfo(result).isNewUser
                    if (user) {
                        const { displayName, email, uid, photoURL } = user || {};
                        setUser({
                            displayName, email, uid, photoURL, result
                        })
                        if (isFirstLogin) {
                            try {
                                await addDoc(collection(db, 'users'), {
                                    displayName: displayName,
                                    email: email,
                                    photoURL: photoURL,
                                    uid: uid,
                                    providerId: result.providerId,
                                })  
                            } catch (error) {
                                console.log(error);
                            }
                        }
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
        <AuthContext.Provider value=
            {{ user, handleLogin, handleSignOut }}
        >
            {isLoading && isClick ? <Spin /> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider