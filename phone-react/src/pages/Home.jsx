import { useState } from "react";
import HomeScreen from "../components/HomeScreen";
import Dock from "../components/Dock";
import VehicleApp from "../apps/VehicleApp";
import Information from "../apps/Information";
import StatusBar from "../components/StatusBar";
import Setting from "../apps/Setting";
import HouseApp from "../apps/HouseApp";
import DatingApp from "../apps/DatingApp";
import LuxuryApp from "../apps/LuxuryApp";
import AdminDashboard from "../apps/AdminDashboard";

export default function Home() {
    const [activeApp, setActiveApp] = useState(null);

    const closeApp = () => setActiveApp(null);

    if (activeApp === "Information") return <Information onClose={closeApp} />;
    if (activeApp === "vehicle") return <VehicleApp onClose={closeApp} />;
    if (activeApp === "setting") return <Setting onClose={closeApp} />;
    if (activeApp === "house") return <HouseApp onClose={closeApp} />;
    if (activeApp === "dating") return <DatingApp onClose={closeApp} />;
    if (activeApp === "luxury") return <LuxuryApp onClose={closeApp} />;
    if (activeApp === "admin") return <AdminDashboard onClose={closeApp} />;

    return (
        <>
            <StatusBar />
            <HomeScreen onOpenApp={setActiveApp} />
            <Dock onOpenApp={setActiveApp} />
        </>
    );
}
