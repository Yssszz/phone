import { Stack, SimpleGrid, Card, Group, Image, Text, Badge, NumberFormatter, Button, Select, TextInput, ActionIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { FaShoppingCart, FaPencilAlt, FaTrash } from "react-icons/fa";
import AppStatus from "../components/AppStatus";
import ItemFormModal from "../components/ItemFormModal";
import { API_URL } from "../config";
import { buyItem } from "../utils/buy";
import { isAdmin, deleteItem } from "../utils/admin";
import styles from "../components/AppCard.module.css";

function HouseApp({ onClose }) {
    const [homes, setHomes] = useState([]); // 后端拿到的房子，一开始是空 array
    const [location, setLocation] = useState(""); // 搜索的地点，"" = 不限
    const [maxPrice, setMaxPrice] = useState(null); // 筛选的最高价，null = 不限
    const [editing, setEditing] = useState(undefined); // undefined = 表单关闭，null = 新增，有房子 = 编辑那间

    // 打开时 + location 或 maxPrice 改变时，去后端拿房子
    useEffect(() => {
        const getHomes = async () => {
            const params = new URLSearchParams();
            if (location) params.append("location", location);
            if (maxPrice) params.append("maxPrice", maxPrice);

            const res = await fetch(`${API_URL}/home?${params}`); // 例如 /home?location=Penang
            setHomes(await res.json());
        };

        getHomes();
    }, [location, maxPrice]);

    // delete house
    const handleDelete = async (id) => {
        const success = await deleteItem(`${API_URL}/home`, id);

        if (success) {
            const newHomes = homes.filter((h) => h._id !== id);
            setHomes(newHomes);
        }
    };

    // 存成功：编辑换掉那一笔，新增加在最后
    const handleSaved = (saved) => {
        const exists = homes.some((h) => h._id === saved._id);
        setHomes(exists ? homes.map((h) => (h._id === saved._id ? saved : h)) : [...homes, saved]);
    };

    return (
        <Stack style={{ flex: 1, background: "linear-gradient(to bottom, #2b2f36, #121418)", overflowY: "auto" }}>
            <AppStatus title="Properties" onClose={onClose} />

            {/* 筛选列 */}
            <Group p="sm" pb={0}>
                <TextInput placeholder="Search location" value={location} onChange={(e) => setLocation(e.currentTarget.value)} />
                <Select
                    placeholder="Max price"
                    clearable
                    value={maxPrice}
                    onChange={setMaxPrice}
                    data={[
                        { value: "500000", label: "Under RM 500k" },
                        { value: "1000000", label: "Under RM 1M" },
                        { value: "5000000", label: "Under RM 5M" },
                    ]}
                />
                {isAdmin() && (
                    <Button variant="light" onClick={() => setEditing(null)}>
                        + Add
                    </Button>
                )}
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm" p="md">
                {homes.map((home) => (
                    <Card key={home._id} radius="md" className={styles.card} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        <Card.Section mb="sm">
                            <Image src={home.image} h={180} fit="cover" fallbackSrc="https://placehold.co/600x400?text=No+Image" />
                        </Card.Section>

                        <Stack gap="xs">
                            <Group justify="space-between" wrap="nowrap">
                                <Text fw={700} size="lg" truncate>
                                    {home.name}
                                </Text>
                                <Badge variant="outline" color="gray" leftSection={<SlCalender />}>
                                    {home.year}
                                </Badge>
                            </Group>

                            <Text size="sm" c="dimmed">
                                {home.location} · {home.sqft} sqft
                            </Text>

                            <Group justify="space-between">
                                <Text fw={800} fz="lg" c="#7FC658">
                                    <NumberFormatter prefix="RM " value={home.price} thousandSeparator />
                                </Text>
                                <Button size="xs" color="green" leftSection={<FaShoppingCart size={16} />} onClick={() => buyItem("House", home._id)}>
                                    Buy
                                </Button>
                            </Group>

                            {isAdmin() && (
                                <Group gap={4} justify="flex-end">
                                    <ActionIcon variant="subtle" color="gray" onClick={() => setEditing(home)}>
                                        <FaPencilAlt size={13} />
                                    </ActionIcon>
                                    <ActionIcon variant="subtle" color="gray" onClick={() => handleDelete(home._id)}>
                                        <FaTrash size={13} />
                                    </ActionIcon>
                                </Group>
                            )}
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>

            <ItemFormModal opened={editing !== undefined} onClose={() => setEditing(undefined)} url={`${API_URL}/home`} fields={["name", "location", "sqft", "price", "year", "image"]} item={editing ?? null} onSaved={handleSaved} />
        </Stack>
    );
}

export default HouseApp;
