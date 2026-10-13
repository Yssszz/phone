import { API_URL } from "../config"; // get backend url
import { Stack, SimpleGrid, Text, Group, Avatar, Image, Badge, Card, Box, Center, NumberFormatter } from "@mantine/core";
import AppStatus from "../components/AppStatus";
import { useState, useEffect } from "react";
import { GiMoneyStack } from "react-icons/gi";

const wallpaper = "https://r2.fivemanage.com/INqJLuvqvnMaDIlxPrNvZ/c4f92f36-9d9b-4abd-b10d-84d265e1edbe.png";

function Information({ onClose }) {
    const display = localStorage.getItem("display");
    const balance = localStorage.getItem("balance");

    // 我买过的东西 一开始是空 array
    const [assets, setAssets] = useState([]);

    // when我开 Information 时去后端拿我的资产(只拿token)
    useEffect(() => {
        const getAssets = async () => {
            const res = await fetch(`${API_URL}/assets`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            });
            const data = await res.json();
            if (res.ok) setAssets(data); // 成功才放进 state，画面重画
        };
        getAssets();
    }, []); // [] = 只在打开时跑一次

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

                <Text w={330} fw={700} c="dimmed" fz="sm" style={{ letterSpacing: 1.5 }}>
                    MY ASSETS
                </Text>

                {/* dont buy anything */}
                {assets.length === 0 && (
                    <Text w={330} c="dimmed" fz="sm">
                        You have not bought anything yet.
                    </Text>
                )}

                {/* 买过的东西：SimpleGrid cols={3} = 一排 3 个，超过自动换行 */}
                <SimpleGrid cols={3} spacing="xs" w={330}>
                    {assets.map((asset) => (
                        <Card key={asset._id} radius="md" p="xs" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }}>
                            <Image src={asset.image} h={60} radius="sm" fit="cover" fallbackSrc="https://placehold.co/200x120?text=No+Image" />


                            <Text fw={700} c="white" fz={11} mt={4} truncate>
                                {asset.name}
                            </Text>

                            <Badge variant="outline" color="gray" size="xs" mt={2}>
                                {asset.category}
                            </Badge>

                            <Text fw={700} c="#7FC658" fz={11} mt={2}>
                                <NumberFormatter prefix="RM " value={asset.price} thousandSeparator />
                            </Text>
                        </Card>
                    ))}
                </SimpleGrid>
            </Stack>
        </Stack>
    );
}

export default Information;
