import { useState } from "react";
import HomeScreen from "../components/HomeScreen";
import Dock from "../components/Dock";
import VehicleApp from "../apps/VehicleApp";
import Information from "../apps/Information";
import HackerApp from "../apps/HackerApp";
import Stocks from "../apps/Stocks";
import StatusBar from "../components/StatusBar";
import Setting from "./Setting";

export default function Home() {
    const [activeApp, setActiveApp] = useState(null);

    const closeApp = () => setActiveApp(null);

    if (activeApp === "Information") return <Information onClose={closeApp} />;
    if (activeApp === "vehicle") return <VehicleApp onClose={closeApp} />;
    if (activeApp === "hacker") return <HackerApp onClose={closeApp} />;
    if (activeApp === "stocks") return <Stocks onClose={closeApp} />;
    if (activeApp === "setting") return <Setting onClose={closeApp} />;

    return (
        <>
            <StatusBar />
            <HomeScreen onOpenApp={setActiveApp} />
            <Dock onOpenApp={setActiveApp} />
        </>
    );
}
