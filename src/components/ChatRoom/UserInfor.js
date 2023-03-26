import { Avatar, Button, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
const { text } = Typography

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
    return (
        <WrapperStyled>
            <div>
                <Avatar>T</Avatar>
                <text className='username'>Truong</text>
            </div>
            <Button ghost>Đăng Xuất</Button>
        </WrapperStyled>
    )
}

export default UserInfor