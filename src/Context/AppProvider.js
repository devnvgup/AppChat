import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";
export const AppContext = createContext();
function AppProvider({ children }) {
  const [addRoomVisible,setAddRoomVisible]=useState(false)
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
  console.log(113113, rooms);
  return (
    <AppContext.Provider value={{ rooms, addRoomVisible, setAddRoomVisible }}>{children}</AppContext.Provider>
  );
}

export default AppProvider;
