import { Stack, Text, Group, Avatar, Image, Badge, Card, Box, Center, NumberFormatter } from "@mantine/core";
import AppStatus from "./AppStatus";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { GiMoneyStack } from "react-icons/gi";

const wallpaper = "https://r2.fivemanage.com/INqJLuvqvnMaDIlxPrNvZ/c4f92f36-9d9b-4abd-b10d-84d265e1edbe.png";

function Information({ onClose }) {
    const display = localStorage.getItem("display");
    const balance = localStorage.getItem("balance");

    return (
        <Stack gap={0} style={{ flex: 1, background: "linear-gradient(to bottom, #2b2f36, #121418)" }}>
            <AppStatus title="Information" onClose={onClose} />

            <Stack align="center" justify="center" style={{ padding: 20 }}>
                <Box className="hover-3d">
                    <figure className="max-w-100 rounded-2xl">
                        <Card unstyled h={200} w={330} style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${wallpaper})` }}>
                            <Stack p="md" h="100%" justify="space-between">
                                <Badge variant="white" color="blue">
                                    Id Card
                                </Badge>

                                <Group justify="space-between" align="center">
                                    <Image src="https://r2.fivemanage.com/INqJLuvqvnMaDIlxPrNvZ/chip.png" w={75} h={58} fit="cover" ml={-14} />
                                    <Avatar radius="md" size={70} src="https://cdn-8.motorsport.com/images/mgl/0rVxlq50/s800/lewis-hamilton-ferrari-2.webp" />
                                </Group>

                                <Text fz={26} fw={700} lh={1}>
                                    {display}
                                </Text>
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

                <Text w={330} fw={700} c="dimmed" fz="sm" style={{ letterSpacing: 1.5 }}>
                    MY WALLET
                </Text>

                <Card
                    w={330}
                    radius="lg"
                    p="lg"
                    style={{
                        // fully thankqiu claude my boy :) sibeh suka this design
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                >
                    <Group justify="space-between">
                        <Group gap="xs">
                            <Center w={34} h={34} style={{ borderRadius: 8, background: "linear-gradient(to bottom, #7FC658, #4a8f2e)" }}>
                                <GiMoneyStack size={20} color="white" />
                            </Center>

                            <Text c="dimmed" size="lg">
                                Balance
                            </Text>
                        </Group>
                    </Group>

                    <Text fz={30} fw={700} mt={4} c="white">
                        <NumberFormatter prefix="RM " value={balance} thousandSeparator />
                    </Text>
                </Card>
            </Stack>
        </Stack>
    );
}

export default Information;
