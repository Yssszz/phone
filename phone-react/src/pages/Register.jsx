import { Stack, Text, Overlay, Group, Divider, Avatar, TextInput, PasswordInput, Button } from "@mantine/core";
import LiveClock from "../components/LiveClock";
import { useState } from "react";

const wallpaper = "https://r2.fivemanage.com/NknkLh3xvdOyH6mjXyCTz/wallpaper.jpg";

const shadow = "0 2px 8px rgba(0,0,0,0.4)";

export default function Register() {
    const [username, setUsername] = useState("");

    return (
        <Stack gap={0} pos="relative" bgsz="cover" bgp="center" style={{ flex: 1, backgroundImage: `url(${wallpaper})` }}>
            <Overlay color="#00143c" backgroundOpacity={0.35} blur={3} zIndex={0} />

            <Stack gap={0} pos="relative" align="center" justify="center" style={{ flex: 1 }}>
                {/* Time and date */}
                <Text fz={80} lh={1} style={{textShadow: shadow}}>
                    <LiveClock />
                </Text>
                <Text style={{textShadow: shadow}}>
                    <LiveClock format="dddd, MMMM D" />
                </Text>

                {/* login page */}
                <Group
                    w="100%"
                    maw={640}
                    mt={15}
                    style={{
                        backgroundImage: "linear-gradient(to bottom, #6a7fd6, #4a60c2)",
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                        borderRadius: 12,
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                    }}
                    justify="center"
                    p={15}
                >
                    <Stack align="center" gap={0} justify="center" p="lg" style={{ flex: 1 }}>
                        <Text style={{ fontSize: 40, textShadow: shadow }}>Register</Text>
                        <Text c="yellow">Lorem</Text>
                    </Stack>

                    <Divider orientation="vertical" color="rgba(255, 255, 255, 0.5)" size="sm" />

                    <Stack w={280} justify="center">
                        <Group justify="flex-start">
                            <Avatar radius="sm" color="indigo" style={{ border: "1px solid white" }}>
                                {username ? username[0].toUpperCase() : "?"}
                            </Avatar>
                            <Text>{username || "Username"}</Text>
                        </Group>
                        <TextInput placeholder="Username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
                        <PasswordInput placeholder="Password" />
                        <Button variant="filled" size="md" style={{ backgroundImage: "linear-gradient(to bottom, #7FC658, #5FA73E)", border: "1px solid white" }}>
                            Register
                        </Button>
                    </Stack>
                </Group>
            </Stack>
            {/* docker */}
            <Group
                justify="space-between"
                px="md"
                h={44}
                pos="relative"
                style={{
                    backgroundImage: "linear-gradient(to bottom, #586ec3, #2C4CAD)",
                    borderTop: "2px solid rgba(255, 255, 255, 0.4)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                }}
            >
                <Text>
                    New player? <b>Register</b>
                </Text>
                <Text size="xs">Larper OS v1.0</Text>
            </Group>
        </Stack>
    );
}
