import { Stack, SimpleGrid, Card, Group, Image, Text, Badge, NumberFormatter, Button, ActionIcon, Select, Modal, TextInput, NumberInput } from "@mantine/core";
import AppStatus from "./AppStatus";
import { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { FaShoppingCart, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import styles from "./VehicleApp.module.css";

function VehicleApp({ onClose }) {
    // ===== 车店资料 =====
    // 从后端拿到的所有车，一开始是空 array，拿到之后才有东西
    const [vehicles, setVehicles] = useState([]);

    // ===== 筛选用 =====
    // 用户在下拉选单选的品牌，null = 没选 = 全部品牌
    const [brand, setBrand] = useState(null);
    // 用户选的最高价钱，null = 没选 = 不限价钱
    const [maxPrice, setMaxPrice] = useState(null);

    // ===== 身份 =====
    // 从抽屉拿 role，是 "admin" 就是 true，不然 false
    // 只是用来决定画面显示什么，真正的保护在后端
    const isAdmin = localStorage.getItem("role") === "admin";

    // ===== Modal 开关 =====
    // opened = 现在开着吗；open() 打开；close() 关掉
    const [opened, { open, close }] = useDisclosure(false);

    // ===== Modal 表单里的输入框 =====
    // 每个输入框一个 state，用户打什么就存什么
    const [name, setName] = useState("");
    const [newBrand, setNewBrand] = useState(""); // 叫 newBrand，避免跟上面筛选的 brand 打架
    const [price, setPrice] = useState("");
    const [year, setYear] = useState("");
    const [image, setImage] = useState("");

    // ===== 正在编辑哪一台 =====
    // null = 现在是"新增"；有 id = 现在是"编辑"那一台
    const [editingId, setEditingId] = useState(null);

    // ===== 打开 app 时 + 筛选改变时，去后端拿车 =====
    // [brand, maxPrice] 的意思：一开始跑一次，之后 brand 或 maxPrice 一变就再跑一次
    useEffect(() => {
        const getVehicles = async () => {
            // 准备网址后面 ? 的那串，有选才放进去
            const params = new URLSearchParams();

            if (brand) {
                params.append("brand", brand);
            }
            if (maxPrice) {
                params.append("maxPrice", maxPrice);
            }

            // 例如 /vehicles?brand=BMW&maxPrice=300000
            const res = await fetch(`http://localhost:3000/vehicles?${params}`);
            const data = await res.json();
            setVehicles(data); // 放进 state → 画面重画
        };

        // useEffect 不能直接写 async，所以在里面开一个 async function 再马上呼叫
        getVehicles();
    }, [brand, maxPrice]);

    // ===== 按 + Add Vehicle =====
    // 清空表单，标记成"新增"，打开 Modal
    const openAdd = () => {
        setEditingId(null);
        setName("");
        setNewBrand("");
        setPrice("");
        setYear("");
        setImage("");
        open();
    };

    // ===== 按 ✏️ =====
    // 把这台车的资料填进表单，记住是哪一台，打开 Modal
    const openEdit = (car) => {
        setEditingId(car._id);
        setName(car.name);
        setNewBrand(car.brand);
        setPrice(car.price);
        setYear(car.year);
        setImage(car.image);
        open();
    };

    // ===== 按 Modal 里的 Save =====
    // 新增和编辑共用：有 editingId 就 PUT（改），没有就 POST（新增）
    const handleSave = async () => {
        const isEditing = editingId !== null;

        // 编辑要带 id，新增不用
        const url = isEditing ? `http://localhost:3000/vehicles/${editingId}` : "http://localhost:3000/vehicles";
        const method = isEditing ? "PUT" : "POST";

        const res = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json", // 有 body，所以要说是 JSON
                Authorization: "Bearer " + localStorage.getItem("token"), // 带手环，后端 auth + admin 才放行
            },
            body: JSON.stringify({ name, brand: newBrand, price, year, image }),
        });

        const data = await res.json();

        // 后端拒绝（例如没填 price、不是 admin）
        if (!res.ok) {
            return notifications.show({
                position: "top-left",
                title: "Save failed",
                message: data.message,
                color: "red",
            });
        }

        if (isEditing) {
            // 编辑：把刚改的那台换成新资料，其他不动
            setVehicles(vehicles.map((car) => (car._id === editingId ? data : car)));
        } else {
            // 新增：原本的车 + 后端回传的新车（有 _id 了）
            setVehicles([...vehicles, data]);
        }

        close();

        notifications.show({
            position: "top-left",
            title: "Saved",
            message: data.name + (isEditing ? " updated" : " added to shop"),
            color: "green",
        });
    };

    // ===== 按 🗑️ =====
    // 收一个 id，知道要删哪一台
    const handleDelete = async (id) => {
        // 先确认，按取消就停
        const sure = window.confirm("Delete this vehicle?");
        if (!sure) return;

        const res = await fetch(`http://localhost:3000/vehicles/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"), // 没 body，只要手环
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return notifications.show({
                position: "top-left",
                title: "Delete failed",
                message: data.message,
                color: "red",
            });
        }

        // 留下 _id 不等于被删那台的车 = 把它从画面拿掉
        setVehicles(vehicles.filter((car) => car._id !== id));

        notifications.show({
            position: "top-left",
            title: "Deleted",
            message: "Vehicle removed from shop",
            color: "green",
        });
    };

    return (
        <Stack style={{ flex: 1, background: "linear-gradient(to bottom, #2b2f36, #121418)" }}>
            <AppStatus title="Vehicle Shop" onClose={onClose} />

            {/* ===== 筛选列 ===== */}
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
                {isAdmin && <Button onClick={openAdd}>+ Add Vehicle</Button>}
            </Group>

            {/* ===== 车子卡片 ===== */}
            <SimpleGrid cols={3} spacing="sm" p="md">
                {vehicles.map((car) => (
                    <Card
                        key={car._id}
                        shadow="sm"
                        radius="md"
                        withBorder
                        style={{
                            // fully thankqiu claude my boy :) sibeh suka this design
                            background: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            boxShadow: "0 12px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                        }}
                        className={styles.card}
                    >
                        {/* 图片 */}
                        <Card.Section mb="sm">
                            <Image src={car.image} h={180} fit="cover" fallbackSrc="https://placehold.co/600x400?text=No+Image" />
                        </Card.Section>

                        <Stack gap="xs">
                            {/* 名字 + 年份 */}
                            <Group justify="space-between">
                                <Text fw={700} size="xl">
                                    {car.brand} {car.name}
                                </Text>
                                <Badge variant="outline" color="gray" radius="sm" leftSection={<SlCalender />}>
                                    {car.year}
                                </Badge>
                            </Group>

                            {/* 价钱 + 买 */}
                            <Group justify="space-between">
                                <Text fw={800} fz="lg" c="#7FC658">
                                    <NumberFormatter prefix="RM " value={car.price} thousandSeparator />
                                </Text>
                                <Button size="xs" radius="sm" color="green" leftSection={<FaShoppingCart size={16} />}>
                                    Buy
                                </Button>
                            </Group>

                            {/* 只有 admin 看到：编辑 + 删除 */}
                            {isAdmin && (
                                <Group gap={6}>
                                    <ActionIcon variant="light" color="yellow" onClick={() => openEdit(car)}>
                                        <FaPencilAlt size={14} />
                                    </ActionIcon>
                                    <ActionIcon variant="light" color="red" onClick={() => handleDelete(car._id)}>
                                        <FaTrash size={14} />
                                    </ActionIcon>
                                </Group>
                            )}
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>

            {/* ===== 新增 / 编辑 共用的 Modal ===== */}
            <Modal opened={opened} onClose={close} title={editingId ? "Edit Vehicle" : "Add Vehicle"} centered>
                <Stack>
                    <TextInput label="Name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                    <TextInput label="Brand" value={newBrand} onChange={(e) => setNewBrand(e.currentTarget.value)} />
                    <NumberInput label="Price" value={price} onChange={setPrice} thousandSeparator />
                    <NumberInput label="Year" value={year} onChange={setYear} />
                    <TextInput label="Image URL" value={image} onChange={(e) => setImage(e.currentTarget.value)} />
                    <Button onClick={handleSave}>Save</Button>
                </Stack>
            </Modal>
        </Stack>
    );
}

export default VehicleApp;
