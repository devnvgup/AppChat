import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { Button, Tooltip, Avatar, Form, Input, Alert } from "antd";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import { useForm } from "antd/es/form/Form";
import useFirestore from "../../hooks/useFirestore";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

function ChatWIndow() {
  const appContext = useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const { selectedRoom, members, setInviteModalVisible } = appContext;
  const [form] = useForm();
  const [inputValue, setInputValue] = useState("");
  const [loadnewMess,setLoadNewMess]=useState(false)

  const handleInput = (e) => {
    setInputValue(e.target.value);
    setLoadNewMess(true)
  };
  const handleSubmit = () => {
    addDocument(
      "messages",
      {
        text: inputValue,
        uid,
        photoURL,
        displayName,
        roomId: selectedRoom.id,
      },
      `${Math.random()}`
    );
    form.resetFields(["message"]);
    setLoadNewMess(false)
  };

  const messageConditon = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom?.id,
    };
  }, [selectedRoom?.id]);
  let messages = useFirestore("messages", messageConditon,loadnewMess);
  messages = messages.sort((a, b) => a?.createdAt?.seconds - b?.createdAt?.seconds);

  return (
    <WrapperStyled>
      {selectedRoom?.id ? (
        <>
          <HeaderStyled>
            <div className="header__infor">
              <p className="header__title">{selectedRoom?.name}</p>
              <span className="header__description">
                {selectedRoom?.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button onClick={() => setInviteModalVisible(true)}>
                Invite
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((item) => (
                  <Tooltip title={item?.displayName} key={item.id}>
                    <Avatar src={item.photoURL}>
                      {item.photoURL
                        ? ""
                        : item.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages.map((item) => (
                <Message
                  key={item.id}
                  text={item.text}
                  photoURL={item.photoURL}
                  displayName={item.displayName}
                  createdAt={item.createdAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item  name='message'>
                <Input
                  onChange={handleInput}
                  onPressEnter={handleSubmit}
                  placeholder="Input message"
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button onClick={handleSubmit}>Send</Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Please select room"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
}

export default ChatWIndow;
