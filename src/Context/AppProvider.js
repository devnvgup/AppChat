import React, { createContext, useContext, useMemo, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";
export const AppContext = createContext();
function AppProvider({ children }) {
  const [addRoomVisible, setAddRoomVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const contextData = useContext(AuthContext);
  const {
    user: { uid },
  } = contextData;
  const roomConditon = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFirestore("rooms", roomConditon, addRoomVisible);
  const selectedRoom = useMemo(() => {
    return rooms.filter(({ id }) => id === selectedRoomId)[0];
  }, [rooms, selectedRoomId]);
  const memberConditon = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom?.members,
    };
  }, [selectedRoom?.members]);
  const members = useFirestore("users", memberConditon, inviteModalVisible);
  return (
    <AppContext.Provider
      value={{
        rooms,
        addRoomVisible,
        setAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        members,
        inviteModalVisible,
        setInviteModalVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
