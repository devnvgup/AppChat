import { Form, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useContext, useRef } from "react";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";

function AddRoomModal() {
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);
  const roomRef = useRef();
  const descRef = useRef();
  const {
    user: { uid },
  } = authContext;
  const { addRoomVisible, setAddRoomVisible } = appContext;
  const [form] = Form.useForm();
  const handleOk = () => {
    addDocument(
      "rooms",
      { ...form.getFieldValue(), members: [uid] },
      `${Math.random()}`
    );
    setAddRoomVisible(false);
    roomRef.current.value = "";
    descRef.current.value = "";
  };
  return (
    <div>
      <Modal
        title="Add Room"
        visible={addRoomVisible}
        onOk={handleOk}
        onCancel={() => setAddRoomVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Room name" name="name">
            <Input placeholder="Input Room" value={123} ref={roomRef} />
          </Form.Item>
          <Form.Item label="Desc" name="description">
            <Input.TextArea placeholder="Input desc" value={123} ref={descRef} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddRoomModal;
