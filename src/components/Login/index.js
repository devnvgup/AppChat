import React, { useContext } from 'react'
import { Row, Col, Typography, Button } from 'antd'
import { AuthContext } from '../../Context/AuthProvider'




const { Title } = Typography
const Login = () => {
    const contextType = useContext(AuthContext)
    const { handleLogin, isFirstLogin } = contextType
    console.log(isFirstLogin);
    const handleFbLogin = async () => {
        handleLogin(true)
    }
    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>Fun Chat</Title>
                    <Button style={{ width: '100%', marginBottom: 5 }}>
                        Đăng nhập bằng Google
                    </Button>
                    <Button onClick={handleFbLogin} style={{ width: '100%', marginBottom: 5 }}>
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Login