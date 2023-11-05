import "./App.css";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
        <AddRoomModal/>
        <InviteMemberModal/>
        </AppProvider>
      </AuthProvider>
    </Router>
    
  );
}

export default App;
