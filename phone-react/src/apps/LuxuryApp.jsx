import { Stack, SimpleGrid, Card, Group, Image, Text, NumberFormatter, Button, ActionIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaPencilAlt, FaTrash } from "react-icons/fa";
import AppStatus from "../components/AppStatus";
import ItemFormModal from "../components/ItemFormModal";
import { API_URL } from "../config";
import { buyItem } from "../utils/buy";
import { isAdmin, deleteItem } from "../utils/admin";
import styles from "../components/AppCard.module.css";

function LuxuryApp({ onClose }) {
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(undefined); // undefined = 表单关闭，null = 新增，有东西 = 编辑那件

    useEffect(() => {
        fetch(`${API_URL}/luxury`).then((res) => res.json()).then(setItems);
    }, []);

    // 删除成功就从画面拿掉
    const handleDelete = async (id) => {
        if (await deleteItem(`${API_URL}/luxury`, id)) setItems(items.filter((i) => i._id !== id));
    };

    // 存成功：编辑换掉那一笔，新增加在最后
    const handleSaved = (saved) => {
        const exists = items.some((i) => i._id === saved._id);
        setItems(exists ? items.map((i) => (i._id === saved._id ? saved : i)) : [...items, saved]);
    };

    return (
        <Stack style={{ flex: 1, background: "linear-gradient(to bottom, #2b2f36, #121418)", overflowY: "auto" }}>
            <AppStatus title="Luxury" onClose={onClose} />

            {isAdmin() && (
                <Group p="sm" pb={0}>
                    <Button variant="light" onClick={() => setEditing(null)}>
                        + Add
                    </Button>
                </Group>
            )}

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm" p="md">
                {items.map((item) => (
                    <Card key={item._id} radius="md" className={styles.card} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        <Card.Section mb="sm">
                            <Image src={item.image} h={180} fit="cover" fallbackSrc="https://placehold.co/600x400?text=No+Image" />
                        </Card.Section>

                        <Text fw={700} size="xl">
                            {item.name}
                        </Text>

                        <Group justify="space-between" mt="xs">
                            <Text fw={800} fz="lg" c="#7FC658">
                                <NumberFormatter prefix="RM " value={item.price} thousandSeparator />
                            </Text>
                            <Button size="xs" color="green" leftSection={<FaShoppingCart size={16} />} onClick={() => buyItem("Luxury", item._id)}>
                                Buy
                            </Button>
                        </Group>

                        {isAdmin() && (
                            <Group gap={4} justify="flex-end" mt="xs">
                                <ActionIcon variant="subtle" color="gray" onClick={() => setEditing(item)}>
                                    <FaPencilAlt size={13} />
                                </ActionIcon>
                                <ActionIcon variant="subtle" color="gray" onClick={() => handleDelete(item._id)}>
                                    <FaTrash size={13} />
                                </ActionIcon>
                            </Group>
                        )}
                    </Card>
                ))}
            </SimpleGrid>

            <ItemFormModal opened={editing !== undefined} onClose={() => setEditing(undefined)} url={`${API_URL}/luxury`} fields={["name", "price", "image"]} item={editing ?? null} onSaved={handleSaved} />
        </Stack>
    );
}

export default LuxuryApp;
