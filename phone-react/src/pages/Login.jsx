import { Stack, Text, Overlay, Group, Divider, Avatar, TextInput, PasswordInput, Button, Anchor } from "@mantine/core";
import LiveClock from "../components/LiveClock";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";
import StatusBar from "../components/StatusBar";

const wallpaper = "https://r2.fivemanage.com/NknkLh3xvdOyH6mjXyCTz/wallpaper.jpg";

const shadow = "0 2px 8px rgba(0,0,0,0.4)";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);

        // If username is blank
        if (!username.trim()) {
            setLoading(false);
            return notifications.show({
                position: "top-left",
                title: "Register failed",
                message: "Username Input Cannot be empty",
                color: "red",
            });
        }

        // If password is blank
        if (!password.trim()) {
            setLoading(false);
            return notifications.show({
                position: "top-left",
                title: "Register failed",
                message: "Password Input Cannot be empty",
                color: "red",
            });
        }

        // If username Character Less Than 6
        if (username.length < 6) {
            setLoading(false);
            return notifications.show({
                position: "top-left",
                title: "Register failed",
                message: "Username must be at least 6 characters",
                color: "red",
            });
        }

        // If password Character Less Than 6
        if (password.length < 6) {
            setLoading(false);
            return notifications.show({
                position: "top-left",
                title: "Register failed",
                message: "Password must be at least 6 characters",
                color: "red",
            });
        }

        // If Everything OK Than Send TO DB
        try {
            const res = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            // Backend says failed
            if (!res.ok) {
                setLoading(false);
                return notifications.show({
                    position: "top-left",
                    title: "Login failed",
                    message: data.message,
                    color: "red",
                });
            }

            // Success
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("display", data.display);
            localStorage.setItem("balance", data.balance);

            notifications.show({
                position: "top-left",
                title: "Welcome!",
                message: "Welcome back, " + data.display,
                color: "green",
            });
            setTimeout(() => navigate("/home"), 1500);
        } catch (err) {
            // Cannot reach backend
            setLoading(false);
            notifications.show({
                position: "top-left",
                title: "Register failed",
                message: "Cannot connect to server",
                color: "red",
            });
        }
    };

    return (
        <>
            <StatusBar />
            <Stack gap={0} pos="relative" bgsz="cover" bgp="center" style={{ flex: 1, backgroundImage: `url(${wallpaper})` }}>
                <Overlay color="#00143c" backgroundOpacity={0.35} blur={3} zIndex={0} />

                <Stack gap={0} pos="relative" align="center" justify="center" style={{ flex: 1 }}>
                    {/* Time and date */}
                    <Text fz={80} lh={1} style={{ textShadow: shadow }}>
                        <LiveClock />
                    </Text>
                    <Text style={{ textShadow: shadow }}>
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
                            <Text style={{ fontSize: 40, textShadow: shadow }}>Login</Text>
                            <Text c="yellow">Sign in to your Account</Text>
                        </Stack>

                        <Divider orientation="vertical" color="rgba(255, 255, 255, 0.5)" size="sm" />

                        <Stack w={280} justify="center">
                            <Group justify="flex-start">
                                <Avatar radius="sm" color="indigo" style={{ border: "1px solid white" }}>
                                    {username ? username[0].toUpperCase() : "?"}
                                </Avatar>
                                <Text>{username || "Username"}</Text>
                            </Group>
                            <TextInput placeholder="Username (For Login)" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
                            <PasswordInput maxLength={10} placeholder="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                            <Button loading={loading} onClick={handleSubmit} variant="filled" size="md" style={{ backgroundImage: "linear-gradient(to bottom, #7FC658, #5FA73E)", border: "1px solid white" }}>
                                Login
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
                    <Anchor component={Link} to="/register" c="white">
                        New Player? Register
                    </Anchor>

                    <Text size="xs">Hello OS v1.0</Text>
                </Group>
            </Stack>
        </>
    );
}
