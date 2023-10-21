import { Avatar, Button, Typography } from "antd";
import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../Context/AuthProvider";
import { db } from "../../firebase/config";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

function UserInfor() {
  const contextData = useContext(AuthContext);
  const {
    user: { uid, photoURL, displayName },
  } = contextData;

  useEffect(() => {
    if (uid) {
      const docRef = doc(db, "users", uid);
      // // Sử dụng onSnapshot để theo dõi thay đổi
      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        const data = docSnapshot.data(); // Lấy dữ liệu từ snapshot
        // Xử lý dữ liệu ở đây
        console.log(data);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [uid]);
  const logOut = () => {
    const auth = getAuth();
    auth.signOut();
    console.log("logout success");
  };
  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {!photoURL ? displayName?.charAt(0).toUpperCase() : ""}
        </Avatar>
        <Typography.Text>{displayName}</Typography.Text>
      </div>
      <Button ghost onClick={logOut}>
        Logout
      </Button>
    </WrapperStyled>
  );
}

export default UserInfor;
