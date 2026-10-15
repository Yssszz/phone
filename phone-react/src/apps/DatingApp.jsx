import { Stack, Text, Group, Modal, Image, Badge, Button, Box, Center, NumberFormatter } from "@mantine/core";
import AppStatus from "../components/AppStatus";
import { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IoClose } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

function DatingApp({ onClose }) {
    const users = [
        { name: "Aarav Sharma", age: 69, away: 1.5, tags: ["Retired", "Rich"], image: "https://i.pinimg.com/1200x/e1/47/96/e14796e07d6e4fd621cda5070e3941c1.jpg" },
        { name: "Ranveer Singh", age: 74, away: 2.7, tags: ["Chill", "Single"], image: "https://i.pinimg.com/736x/36/6c/e7/366ce766378322a5fdefc5ea90b0222d.jpg" },
        { name: "Manpreet Sidhu", age: 65, away: 4.6, tags: ["Nice Talking", "Chill"], image: "https://i.pinimg.com/736x/c1/64/13/c16413c7dcc80a52f92bf7e10cffb2e7.jpg" },
        { name: "Tuff Guy", age: 8, away: 7.4, tags: ["Tuff"], image: "https://i.pinimg.com/736x/00/85/e9/0085e978e7a8377b2dcceff95bafc3af.jpg" },
        { name: "Amir", age: 56, away: 0.01, tags: ["Nice Guys"], image: "https://i.pinimg.com/736x/d7/0c/07/d70c07c034d0cc4864d62d2ba8e864e4.jpg" },
        { name: "John", age: 19, away: 5.4, tags: ["Roblox Player"], image: "https://i.pinimg.com/736x/24/6d/be/246dbedb1e5913088a5ba281fd57b106.jpg" },
        { name: "Niteesh", age: 56, away: 3.4, tags: ["Friendly"], image: "https://i.pinimg.com/1200x/a0/01/fb/a001fb1d8ffd378a7c0701b950ff21f9.jpg" },
        { name: "Darren Jason", age: 22, away: 1.3, tags: ["Streamer"], image: "https://i.pinimg.com/736x/12/9b/9b/129b9b9283b4ae262b30b02e7bb17ab3.jpg" },
        { name: "Pessi", age: 43, away: 6.3, tags: ["Footballer"], image: "https://i.pinimg.com/736x/fe/93/d7/fe93d7b44106a1c0d255afaac481c048.jpg" },
        {
            name: "KB Tan",
            age: 19,
            away: 0.1,
            tags: ["Simpp", "Nice Talking"],
            image: "https://media.discordapp.net/attachments/1032331613222211666/1559810453012611113/A3C276B9-B1F6-48E2-981A-A16D45244DB8.jpg?ex=6ad06e2f&is=6acf1caf&hm=708bfc5033e017bbe8929a4785cad1581c36f5a8cf73da71caea68e9d5784b00&=&format=webp",
        },
        {
            name: "Peter",
            age: 20,
            away: 0.1,
            tags: ["entrepreneur"],
            image: "https://media.discordapp.net/attachments/1032331613222211666/1559811891201577073/2305C73A-7A69-4678-909A-2A51873E6A41.png?ex=6ad06f86&is=6acf1e06&hm=39af37ad5852ddeaaab2901cdd49672d03ef2d40411ae61f7c131d8ee3d62cd2&=&format=webp&quality=lossless&width=481&height=640",
        },
    ];
    const [current, setCurrent] = useState(() => users[Math.floor(Math.random() * users.length)]);

    const nextUser = () => {
        setCurrent(users[Math.floor(Math.random() * users.length)]);
    };

    const [paywallOpen, setPaywallOpen] = useState(false);

    const selectUser = () => {};
    return (
        <>
            <Stack gap={0} style={{ flex: 1, background: "linear-gradient(180deg,  #FFF0F4 0%, #F9DDE6 35%, #F2BDCF 70%, #EBA9C0 100%)" }}>
                <AppStatus title="Lovio" onClose={onClose} />

                <Stack align="center" justify="center" style={{ padding: 20 }}>
                    <Box pos="relative" w={350} h={350} style={{ borderRadius: 8, overflow: "hidden" }}>
                        <Image h={350} w={350} fit="cover" src={current.image} />

                        <Stack pos="absolute" bottom={0} left={0} right={0} align="center" gap={5} py="xs" style={{ background: "rgba(0,0,0,0.6)" }}>
                            <Group gap="md">
                                <Text>{current.name}</Text>
                                <Text>{current.age}</Text>
                            </Group>
                            <Text size="sm">{current.away} km away</Text>
                            <Group gap="md">
                                {current.tags.map((tag) => (
                                    <Badge variant="outline" key={tag}>
                                        {tag}
                                    </Badge>
                                ))}
                            </Group>
                        </Stack>
                    </Box>

                    <Group gap="xl">
                        <ActionIcon
                            size={90}
                            radius="50%"
                            onClick={() => setPaywallOpen(true)}
                            style={{
                                background: "linear-gradient(to bottom, #ffd6e2, #f7a1bb)",
                                border: "2px solid rgba(255,255,255,0.7)",
                                boxShadow: "0 8px 16px rgba(232,54,93,0.35), inset 0 -6px 10px rgba(232,54,93,0.2), inset 0 4px 8px rgba(255,255,255,0.8)",
                            }}
                        >
                            <FaHeart size={40} color="#e8365d" />
                        </ActionIcon>

                        <ActionIcon
                            size={90}
                            radius="50%"
                            onClick={nextUser}
                            style={{
                                background: "linear-gradient(to bottom, #ffd6e2, #f7a1bb)",
                                border: "2px solid rgba(255,255,255,0.7)",
                                boxShadow: "0 8px 16px rgba(232,54,93,0.35), inset 0 -6px 10px rgba(232,54,93,0.2), inset 0 4px 8px rgba(255,255,255,0.8)",
                            }}
                        >
                            <IoClose size={50} color="#e8365d" />
                        </ActionIcon>
                    </Group>
                </Stack>
            </Stack>

            <Modal
                opened={paywallOpen}
                onClose={() => setPaywallOpen(false)}
                title="Premium Required"
                styles={{
                    title: { flex: 1, textAlign: "center", fontWeight: 700 },
                }}
            >
                <Group justify="center" align="center">
                    <Text>You Need To Premium To Like Profiles.</Text>
                    <Button color="green">Pay RM69</Button>
                </Group>
            </Modal>
        </>
    );
}

export default DatingApp;
