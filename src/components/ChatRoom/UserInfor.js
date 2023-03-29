import { Avatar, Button, Typography } from 'antd'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { authen } from '../firebase/config'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from '../firebase/config'

const WrapperStyled = styled.div`
    display:flex;
    justify-content:space-between;
    padding:12px 16px;
    border-bottom:1px solid rgba(82,38,83);

    .username {
        color:white;
        margin-left:5px
    }
`

const UserInfor = () => {
    const nav = useNavigate()
    const contextType = useContext(AuthContext)
    const { handleSignOut } = contextType
    const signOutAcc = () => {
        signOut(authen).then(() => {
            console.log('Sign out success');
            handleSignOut(false)
            nav('/login')
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        let tmp
        let data = []
        const dbRef = collection(db, "user");
        onSnapshot(dbRef, docsSnap => {
            console.log(docsSnap);
        docsSnap.forEach(doc => {
            console.log(doc);
              tmp = {
                ...doc.data(),
                id:doc.id,
              }
              data.push(tmp)
            })
            console.log(data);
        });
    }, [])

    return (
        <WrapperStyled>
            <div>
                <Avatar>T</Avatar>
                <Typography.Text className='username'>Truong</Typography.Text>
            </div>
            <Button ghost onClick={signOutAcc}>Đăng Xuất</Button>
        </WrapperStyled>
    )
}

export default UserInfor