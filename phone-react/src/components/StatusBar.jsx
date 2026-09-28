import { Group, Text, Box } from "@mantine/core";
import { FaWifi } from "react-icons/fa";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { IoBatteryCharging } from "react-icons/io5";
import "../components/StatusBar.css";
import LiveClock from "./LiveClock";

function StatusBar() {
    return (
        <Group align="center" p={5} style={{ backgroundColor: "#4f4f4fc7", borderBottom: "3px solid #888" }}>
            <Box style={{ flex: 1, minWidth: 0 }}>
                <Text ta="left">T-MOBILE</Text>
            </Box>

            <Box style={{ flex: 1, minWidth: 0 }}>
                <Text ta="center">
                    <LiveClock format="hh:mm A"/>
                </Text>
            </Box>

            <Box
                style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 5,
                }}
            >
                <MdOutlineSignalCellularAlt size={20} />
                <FaWifi size={20} />
                <IoBatteryCharging size={25} />
            </Box>
        </Group>
    );
}

export default StatusBar;
