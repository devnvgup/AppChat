import { Col, Row } from 'antd'
import React from 'react'
import RoomList from './RoomList'
import UserInfor from './UserInfor'
import styled from 'styled-components'

const SideBarStyled = styled.div`
    background:#3f0e40;
    color:white;
    height:100vh;
`

const Sidebar = () => {
  return (
    <SideBarStyled>
        <Row>
            <Col span={24}><UserInfor/></Col>
            <Col span={24}><RoomList/></Col>
        </Row>
    </SideBarStyled>
  )
}

export default Sidebar