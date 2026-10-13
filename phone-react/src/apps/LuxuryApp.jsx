import { Stack, SimpleGrid, Card, Group, Image, Text, NumberFormatter, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import AppStatus from "../components/AppStatus";
import { API_URL } from "../config";
import { buyItem } from "../utils/buy";
import styles from "../components/AppCard.module.css";

function LuxuryApp({ onClose }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/luxury`).then((res) => res.json()).then(setItems);
    }, []);

    return (
        <Stack style={{ flex: 1, background: "linear-gradient(to bottom, #2b2f36, #121418)", overflowY: "auto" }}>
            <AppStatus title="Luxury" onClose={onClose} />

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
                    </Card>
                ))}
            </SimpleGrid>
        </Stack>
    );
}

export default LuxuryApp;
