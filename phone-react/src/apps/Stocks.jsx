// apps/VehicleApp.jsx
import { Stack, Text, Button } from "@mantine/core";
import AppStatus from "./AppStatus";
import { CandlestickChart } from "@mantine/charts";

const data = [
    { date: "Mar 01", open: 136, high: 142, low: 133, close: 140 },
    { date: "Mar 02", open: 140, high: 145, low: 138, close: 139 },
    { date: "Mar 03", open: 139, high: 141, low: 129, close: 131 },
];

function Stocks({ onClose }) {
    return (
        <Stack style={{ flex: 1, backgroundColor: "#888" }}>
            <AppStatus title="Stocks" onClose={onClose} />

            <CandlestickChart h={300} data={data} dataKey="date" />
        </Stack>
    );
}

export default Stocks;
