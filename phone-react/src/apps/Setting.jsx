import { Stack, TextInput, PasswordInput, Button, Card, Text } from "@mantine/core";
import { IconUser, IconId, IconLock } from "@tabler/icons-react";
import AppStatus from "./AppStatus";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export default function Setting({ onClose }) {
    const navigate = useNavigate();

    const [display, setDisplay] = useState(localStorage.getItem("display") || "");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        setLoading(true);

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("display");

        setTimeout(() => {
            navigate("/login");
            notifications.show({
                position: "top-left",
                title: "Logged out",
                message: "See you next time!",
                color: "blue",
            });
        }, 1500);
    };

    const handleDelete = async () => {
        // ① 先确认
        const sure = window.confirm("Are you sure? This cannot be undone.");
        if (!sure) return;

        setLoading(true);

        try {
            // ② 带着手环送 DELETE
            const res = await fetch("http://localhost:3000/users/me", {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            const data = await res.json();

            // ③ 后端说失败
            if (!res.ok) {
                setLoading(false);
                return notifications.show({
                    position: "top-left",
                    title: "Delete failed",
                    message: data.message,
                    color: "red",
                });
            }

            // ④ 成功：清掉手环，回 login
            localStorage.clear();
            notifications.show({
                position: "top-left",
                title: "Account deleted",
                message: "Your account has been deleted",
                color: "red",
            });
            navigate("/login");
        } catch (err) {
            setLoading(false);
            notifications.show({
                position: "top-left",
                title: "Delete failed",
                message: "Cannot connect to server",
                color: "red",
            });
        }
    };

    const handleSave = async () => {
        // ② 检查
        if (!display.trim()) {
            return notifications.show({
                position: "top-left",
                title: "Update failed",
                message: "Display Name cannot be empty",
                color: "red",
            });
        }

        if (display.trim() === localStorage.getItem("display")) {
            return notifications.show({
                position: "top-left",
                title: "Nothing changed",
                message: "This is already your display name",
                color: "yellow",
            });
        }

        try {
            // ③ 送去后端
            const res = await fetch("http://localhost:3000/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({ display }),
            });

            const data = await res.json();

            if (!res.ok) {
                return notifications.show({
                    position: "top-left",
                    title: "Update failed",
                    message: data.message,
                    color: "red",
                });
            }

            // ④ 成功
            localStorage.setItem("display", data.display);

            notifications.show({
                position: "top-left",
                title: "Saved",
                message: "Display name updated to " + data.display,
                color: "green",
            });
        } catch (err) {
            notifications.show({
                position: "top-left",
                title: "Update failed",
                message: "Cannot connect to server",
                color: "red",
            });
        }
    };

    const handleSavePassword = async () => {
        if (password.length < 6) {
            return notifications.show({
                position: "top-left",
                title: "Update failed",
                message: "Password must be at least 6 characters",
                color: "red",
            });
        }

        try {
            const res = await fetch("http://localhost:3000/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (!res.ok) {
                return notifications.show({
                    position: "top-left",
                    title: "Update failed",
                    message: data.message,
                    color: "red",
                });
            }

            setPassword("");

            notifications.show({
                position: "top-left",
                title: "Saved",
                message: "Password changed",
                color: "green",
            });
        } catch (err) {
            notifications.show({
                position: "top-left",
                title: "Update failed",
                message: "Cannot connect to server",
                color: "red",
            });
        }
    };

    return (
        <Stack gap={0} style={{ flex: 1, backgroundColor: "#16181d" }}>
            <AppStatus title="Settings" onClose={onClose} />

            <Stack p={20} gap={20} w="100%" maw={480} mx="auto">
                <Card radius="md" style={{ backgroundColor: "#23262d", border: "1px solid #3d424c" }}>
                    <Stack>
                        <Text fw={700} c="#8fb4ff">
                            Profile Changer
                        </Text>

                        <TextInput value={display} onChange={(e) => setDisplay(e.currentTarget.value)} label="Display Name" placeholder="Display Name" maxLength={20} leftSection={<IconUser size={16} />} />
                        <Button onClick={handleSave} style={{ backgroundImage: "linear-gradient(to bottom, #5a9bff, #1c47b5)" }}>
                            Save Changes
                        </Button>
                        <TextInput label="Username" placeholder={username + " (Cant change Username due to avoild forgot)"} disabled leftSection={<IconId size={16} />} />
                        <PasswordInput value={password} onChange={(e) => setPassword(e.currentTarget.value)} label="New Password" placeholder="New Password" leftSection={<IconLock size={16} />} />

                        <Button onClick={handleSavePassword} style={{ backgroundImage: "linear-gradient(to bottom, #5a9bff, #1c47b5)" }}>
                            Save Changes
                        </Button>
                    </Stack>
                </Card>

                <Button onClick={handleLogout} loading={loading} color="green">
                    Log Off
                </Button>
                <Button onClick={handleDelete} color="red" variant="light">
                    Delete Account
                </Button>
            </Stack>
        </Stack>
    );
}
