import { Routes, Route, Navigate } from "react-router";
import PhoneFrame from "./components/PhoneFrame";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./apps/Home";
import ProtectRoute from "./components/ProtectRoute";

function App() {
    return (
        <PhoneFrame>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/home"
                    element={
                        <ProtectRoute>
                            <Home />
                        </ProtectRoute>
                    }
                />
            </Routes>
        </PhoneFrame>
    );
}

export default App;
