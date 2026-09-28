import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function LiveClock({ format = "HH:mm" }) {
    const [now, setNow] = useState(dayjs());

    useEffect(() => {
        const timer = setInterval(() => setNow(dayjs()), 1000);
        return () => clearInterval(timer);
    }, []);

    return <>{now.format(format)}</>;
}
