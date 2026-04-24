import { Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./NotificationContext.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import SignUp from "./Sign_Up.jsx";
import Login from "./Login.jsx";
import Appointments from "./Appointments.jsx";

export default function App() {
  return (
    <NotificationProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </NotificationProvider>
  );
}
