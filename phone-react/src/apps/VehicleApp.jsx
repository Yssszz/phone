import { Stack, SimpleGrid, Card, Group, Image, Text, Badge, NumberFormatter, Button, Select, ActionIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { FaShoppingCart, FaPencilAlt, FaTrash } from "react-icons/fa";
import AppStatus from "../components/AppStatus";
import ItemFormModal from "../components/ItemFormModal"; // 新增/编辑表单
import { API_URL } from "../config"; // 后端网址
import { buyItem } from "../utils/buy"; // 买东西的函数
import { isAdmin, deleteItem } from "../utils/admin"; // admin 才看得到编辑/删除
import styles from "../components/AppCard.module.css"; // 卡片 hover 动画

function VehicleApp({ onClose }) {
    const [vehicles, setVehicles] = useState([]); // 后端拿到的车，一开始是空 array
    const [brand, setBrand] = useState(null); // 筛选的品牌，null = 全部
    const [maxPrice, setMaxPrice] = useState(null); // 筛选的最高价，null = 不限
    const [editing, setEditing] = useState(undefined); // undefined = 表单关闭，null = 新增，有车 = 编辑那辆

    // 打开时 + brand 或 maxPrice 改变时，去后端拿车
    useEffect(() => {
        const getVehicles = async () => {
            const params = new URLSearchParams(); // 网址 ? 后面的那串
            if (brand) params.append("brand", brand);
            if (maxPrice) params.append("maxPrice", maxPrice);

            const res = await fetch(`${API_URL}/vehicles?${params}`); // 例如 /vehicles?brand=BMW
            setVehicles(await res.json());
        };

        getVehicles();
    }, [brand, maxPrice]);

    // 删除成功就从画面拿掉
    const handleDelete = async (id) => {
        if (await deleteItem(`${API_URL}/vehicles`, id)) setVehicles(vehicles.filter((v) => v._id !== id));
    };

    // 存成功：编辑换掉那一笔，新增加在最后
    const handleSaved = (saved) => {
        const exists = vehicles.some((v) => v._id === saved._id);
        setVehicles(exists ? vehicles.map((v) => (v._id === saved._id ? saved : v)) : [...vehicles, saved]);
    };

    return (
        <Stack style={{ flex: 1, background: "linear-gradient(to bottom, #2b2f36, #121418)", overflowY: "auto" }}>
            <AppStatus title="Vehicle" onClose={onClose} />

            {/* 筛选列 filter */}
            <Group p="sm" pb={0}>
                <Select placeholder="All brands" clearable value={brand} onChange={setBrand} data={["Honda", "BMW", "Mercedes", "Ferrari", "Land Rover", "Toyota", "Perodua"]} />
                <Select
                    placeholder="Max price"
                    clearable
                    value={maxPrice}
                    onChange={setMaxPrice}
                    data={[
                        { value: "100000", label: "Under RM 100k" },
                        { value: "300000", label: "Under RM 300k" },
                        { value: "1000000", label: "Under RM 1M" },
                    ]}
                />
                {isAdmin() && (
                    <Button variant="light" onClick={() => setEditing(null)}>
                        + Add
                    </Button>
                )}
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm" p="md">
                {vehicles.map((car) => (
                    <Card key={car._id} radius="md" className={styles.card} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        <Card.Section mb="sm">
                            <Image src={car.image} h={180} fit="cover" fallbackSrc="https://placehold.co/600x400?text=No+Image" />
                        </Card.Section>

                        <Stack gap="xs">
                            <Group justify="space-between">
                                <Text fw={700} size="xl">
                                    {car.brand} {car.name}
                                </Text>
                                <Badge variant="outline" color="gray" leftSection={<SlCalender />}>
                                    {car.year}
                                </Badge>
                            </Group>

                            <Group justify="space-between">
                                <Text fw={800} fz="lg" c="#7FC658">
                                    <NumberFormatter prefix="RM " value={car.price} thousandSeparator />
                                </Text>
                                <Button size="xs" color="green" leftSection={<FaShoppingCart size={16} />} onClick={() => buyItem("Car", car._id)}>
                                    Buy
                                </Button>
                            </Group>

                            {isAdmin() && (
                                <Group gap={4} justify="flex-end">
                                    <ActionIcon variant="subtle" color="gray" onClick={() => setEditing(car)}>
                                        <FaPencilAlt size={13} />
                                    </ActionIcon>
                                    <ActionIcon variant="subtle" color="gray" onClick={() => handleDelete(car._id)}>
                                        <FaTrash size={13} />
                                    </ActionIcon>
                                </Group>
                            )}
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>

            <ItemFormModal opened={editing !== undefined} onClose={() => setEditing(undefined)} url={`${API_URL}/vehicles`} fields={["name", "brand", "price", "year", "image"]} item={editing ?? null} onSaved={handleSaved} />
        </Stack>
    );
}

export default VehicleApp;
