import { Avatar, Form, Input, Select, Spin } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import { debounce } from "lodash";
import { db } from "../../firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

function DeboundSelect({ fetchOptions, deboundTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const deboundFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, deboundTimeout);
  }, [deboundTimeout, fetchOptions]);
  return (
    <Select
      labelInValue
      onSearch={deboundFetcher}
      notFoundContent={fetching ? <Spin /> : null}
      filterOption={false}
      {...props}
    >
      {options?.map((option) => (
        <Select.Option
          key={option?.value}
          value={option?.value}
          title={option?.label}
        >
          <Avatar size="small" src={option?.photoURL}>
            {option.photoURL
              ? ""
              : option?.displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
          {option?.label}
        </Select.Option>
      ))}
    </Select>
  );
}

function InviteMemberModal() {
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);
  const {
    user: { uid },
  } = authContext;
  const { inviteModalVisible, setInviteModalVisible, selectedRoomId } =
    appContext;
  const [value, setValue] = useState();
  const [form] = Form.useForm();
  const handleOk = () => {
    form.resetFields();
    const roomRef = doc(db, "rooms", selectedRoomId);

    getDoc(roomRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const currentData = docSnapshot.data();
          const currentMembers = currentData.members || [];
          const newMembers = value.map((val) => val.value);

          const updatedMembers = [
            ...new Set([...currentMembers, ...newMembers]),
          ];

          return updateDoc(roomRef, {
            members: updatedMembers,
          });
        } else {
          console.error("Document does not exist.");
        }
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    setInviteModalVisible(false);
  };
  const fetchUsersList = async (search) => {
    const docRef = collection(db, "users");
    const q = query(docRef, where("keyWord", "array-contains", search));
    const records = [];
    const querySnapshot = async () => {
      let res = await getDocs(q);
      //TODO: check logic add room when finish project
      res.forEach((doc) => {
        records.push({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        });
      });
    };
    await querySnapshot();
    return records;
  };
  return (
    <div>
      <Modal
        title="Invite Friends"
        visible={inviteModalVisible}
        onOk={handleOk}
        onCancel={() => setInviteModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <DeboundSelect
            mode="multiple"
            label="Friends Name"
            value={value}
            placeholder="Input Friends Name"
            fetchOptions={fetchUsersList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
          />
        </Form>
      </Modal>
    </div>
  );
}

export default InviteMemberModal;
