import { Stack, Text, Group, Avatar, Button, NumberFormatter, Card, Box, Notification } from "@mantine/core";
import AppStatus from "./AppStatus";
import AssetList from "./AssetsList";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

function Information({ onClose }) {
    const CurrentValue = 100;
    const del = CurrentValue / 2;

    const progress = (CurrentValue / del) * 100;

    const [role, SetRole] = useState("user");

    const handleClick = () => {
        if (role === "user") {
            SetRole("admin");
        } else {
            notifications.show({
                position: "top-right",
                autoClose: 2000,
                color: "yellow",
                title: "We notify you that",
                message: "You already Admin Role",
            });
        }
    };

    return (
        <Stack gap={0} style={{ flex: 1, backgroundColor: "#888" }}>
            <AppStatus title="Information" onClose={onClose} />

            <Stack style={{ padding: 20 }}>
                <Group justify="center">
                    <Avatar variant="filled" radius="sm" size="xl" src="https://imageio.forbes.com/specials-images/imageserve/62d700cd6094d2c180f269b9/0x0.jpg?format=jpg&crop=959,959,x0,y0,safe&height=416&width=416&fit=bounds" />
                    <Stack>
                        <Text>Elon Musk</Text>
                        <Text>
                            <NumberFormatter prefix="RM " value={CurrentValue} thousandSeparator />
                        </Text>
                    </Stack>
                    <Box className="aura aura-lg     text-orange-600 duration-1000">
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Text>This card has aura</Text>
                        </Card>
                    </Box>
                    <Button onClick={handleClick}>Change Role</Button>
                    {role === "admin" && <Button>Click Me</Button>}
                    <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                </Group>
            </Stack>
            <AssetList />
        </Stack>
    );
}

export default Information;
