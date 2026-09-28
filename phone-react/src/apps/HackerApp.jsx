import { Stack, Text, Group, Select, Button, Image, Card, Box, Input, NumberFormatter } from "@mantine/core";
import AppStatus from "./AppStatus";
import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import "./HackerApp.module.css";

function HackerApp({ onClose }) {
    const [Balance, SetBalance] = useState(1000);
    const [balance, setBalance] = useState(0);
    const [selectedAmount, SetSelectedAmount] = useState(null);
    const [loading, SetLoading] = useState(false);
    const [count, SetCount] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3000/balance")
            .then((res) => res.json())
            .then((data) => setBalance(data.balance));
    }, []);

    const handleClick = () => {
        if (!selectedAmount) {
            notifications.show({
                position: "bottom-right",
                autoClose: 3000,
                color: "red",
                title: "Hack Failed",
                message: `Please Choose Your Amount To Hack`,
            });
            return;
        } else {
            SetLoading(true);
            setTimeout(() => {
                SetBalance((prev) => prev + Number(selectedAmount));
                SetLoading(false);
                notifications.show({
                    position: "bottom-right",
                    autoClose: 3000,
                    color: "green",
                    title: "Hack Success",
                    message: `Amount ${selectedAmount} Has Added To Your Account`,
                });
            }, 3000);
        }
    };

    const clicker = (e) => {
        if (e.target.className.includes("wow")) {
            SetCount(count + 2);
            console.log(`你是wow`);
        } else {
            SetCount(count + 1);
            console.log(`你不是wow`);
        }
    };

    return (
        <Stack gap={0} style={{ flex: 1, backgroundColor: "#373e37" }}>
            <AppStatus title="Hacker App" onClose={onClose} />

            <Stack justify="center" align="center" gap={11} m="auto">
                <Box className="hover-3d">
                    <figure>
                        <Card
                            w={300}
                            h={175}
                            style={{
                                background: "linear-gradient(to right, #bb377d, #fbd3e9)",
                            }}
                            padding="md"
                            withBorder
                        >
                            <Stack gap="xl">
                                <Text c="white" size="xl">
                                    PayMe Bank
                                </Text>

                                <Text c="white" fw={700}>
                                    •••• •••• •••• 3312
                                </Text>
                                <Group grow c="white">
                                    <Text>user</Text>
                                    <Text>07/05</Text>
                                </Group>
                            </Stack>
                        </Card>
                    </figure>

                    <Box></Box>
                    <Box></Box>
                    <Box></Box>
                    <Box></Box>
                    <Box></Box>
                    <Box></Box>
                    <Box></Box>
                    <Box></Box>
                </Box>

                <Text size="xl">
                    Current Balance: <NumberFormatter prefix="RM " value={balance} thousandSeparator />
                </Text>
                <Select value={selectedAmount} onChange={SetSelectedAmount} label="Choose Your Amount To Hack" placeholder="Pick value" data={["500", "1000", "5000", "10000"]} />
                <Button onClick={handleClick} loading={loading} color="green">
                    Hack Amount
                </Button>
                <p>你点了 {count}</p>
                <Button onClick={clicker}>点我</Button>
                <Button className="wow" onClick={clicker}>
                    点我
                </Button>
            </Stack>
        </Stack>
    );
}

export default HackerApp;
