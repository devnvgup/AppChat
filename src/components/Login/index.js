import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth, startFireBase } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";

startFireBase();
const { Title } = Typography;
function Login() {
  const provider = new FacebookAuthProvider();

  const handleFacebookLogin = async () => {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const { user, _tokenResponse } = result;
        if (_tokenResponse?.isNewUser) {
          const data = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            providerId: user.providerId,
            uid: user.uid,
            keyWord: generateKeywords(user.displayName),
          };
          await addDocument("users", data, user.uid);
        }
        console.log("login success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Row justify="center" style={{ height: 800 }}>
      <Col span={8}>
        <Title style={{ textAlign: "center" }} level={3}>
          App Chat
        </Title>
        <Button style={{ width: "100%", marginBottom: 5 }}>
          Đăng nhập bằng Google
        </Button>
        <Button onClick={handleFacebookLogin} style={{ width: "100%" }}>
          Đăng nhập bằng Facebook
        </Button>
      </Col>
    </Row>
  );
}

export default Login;
