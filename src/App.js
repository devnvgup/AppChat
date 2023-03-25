import Login from './components/Login/index'
import ChatRoom from './components/ChatRoom/index'
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Context/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthProvider>
      <Login />
    </AuthProvider>,
  },
  {
    path: "/",
    element: <AuthProvider>
      <ChatRoom />
    </AuthProvider>
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
