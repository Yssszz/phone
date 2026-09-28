import { useState } from "react";
import PhoneFrame from "./components/PhoneFrame";
import StatusBar from "./components/StatusBar";
import HomeScreen from "./components/HomeScreen";
import Dock from "./components/Dock";
import VehicleApp from "./apps/VehicleApp";
import Information from "./apps/Information";
import HackerApp from "./apps/HackerApp";
import Stocks from "./apps/Stocks";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const [activeApp, setActiveApp] = useState(null);
    
    const closeApp = () => setActiveApp(null);

    return (
        <PhoneFrame>
            <StatusBar />
            <Login />
        </PhoneFrame>
    );
}

export default App;
