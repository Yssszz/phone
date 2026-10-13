import { Stack, Tabs, Table, Group, Button, ActionIcon, Modal, TextInput, Text, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import AppStatus from "../components/AppStatus";
import { API_URL } from "../config"; // 后端网址

// 4 个 tab：每个 tab 只需要知道 "后端网址" 和 "有哪些栏位"
// 栏位同时用来：画表格的栏 + 画新增/编辑表单的输入框
const TABS = {
    vehicles: { label: "Vehicles", url: `${API_URL}/vehicles`, fields: ["name", "brand", "price", "year", "image"] },
    home: { label: "Homes", url: `${API_URL}/home`, fields: ["name", "location", "sqft", "price", "year", "image"] },
    luxury: { label: "Luxury", url: `${API_URL}/luxury`, fields: ["name", "price", "image"] },
    users: { label: "Users", url: `${API_URL}/users`, fields: ["username", "display", "role", "balance"] },
};

// 全部功能(新增/编辑/删除)都集中在这里，商店 app 只负责看和买
function AdminDashboard({ onClose }) {
    const [tab, setTab] = useState("vehicles"); // 现在开着哪个 tab
    const [rows, setRows] = useState([]); // 这个 tab 的资料，一笔一行
    const [form, setForm] = useState({}); // 表单里的资料，例如 { name: "Civic", price: "150000" }
    const [editingId, setEditingId] = useState(null); // null = 新增；有 id = 编辑那一笔
    const [opened, { open, close }] = useDisclosure(false); // Modal 开关

    const { url, fields } = TABS[tab]; // 现在这个 tab 的网址和栏位
    const headers = { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") }; // 每次请求都带 token，后端检查是不是 admin
    const isUsers = tab === "users"; // 用户只能看和删除，不能新增/编辑

    // 打开时 + 换 tab 时，去后端拿这个 tab 的资料
    useEffect(() => {
        const getRows = async () => {
            const res = await fetch(url, { headers });
            const data = await res.json();

            if (!res.ok) {
                setRows([]);
                return notifications.show({ position: "top-left", title: "Load failed", message: data.message, color: "red" });
            }
            setRows(data);
        };

        getRows();
    }, [tab]);

    // 按 + Add：清空表单，标记成"新增"
    const openAdd = () => {
        setEditingId(null);
        setForm({});
        open();
    };

    // 按 ✏️：把这笔资料放进表单，记住是哪一笔
    const openEdit = (row) => {
        setEditingId(row._id);
        setForm(row);
        open();
    };

    // 按 Save：有 editingId 就 PUT(改)，没有就 POST(新增)
    const handleSave = async () => {
        const isEditing = editingId !== null;

        const res = await fetch(isEditing ? `${url}/${editingId}` : url, {
            method: isEditing ? "PUT" : "POST",
            headers,
            body: JSON.stringify(form),
        });
        const data = await res.json();

        if (!res.ok) {
            return notifications.show({ position: "top-left", title: "Save failed", message: data.message, color: "red" });
        }

        // 编辑：换掉那一笔；新增：加在最后
        setRows(isEditing ? rows.map((r) => (r._id === editingId ? data : r)) : [...rows, data]);
        close();
        notifications.show({ position: "top-left", title: "Saved", message: "Done", color: "green" });
    };

    // 按 🗑️：确认后删除，再把它从画面拿掉
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this record?")) return;

        const res = await fetch(`${url}/${id}`, { method: "DELETE", headers });
        const data = await res.json();

        if (!res.ok) {
            return notifications.show({ position: "top-left", title: "Delete failed", message: data.message, color: "red" });
        }

        setRows(rows.filter((r) => r._id !== id));
        notifications.show({ position: "top-left", title: "Deleted", message: "Record removed", color: "green" });
    };

    return (
        <Stack style={{ flex: 1, background: "linear-gradient(to bottom, #2b2f36, #121418)", overflowY: "auto" }}>
            <AppStatus title="Admin Dashboard" onClose={onClose} />

            <Stack p="sm" pt={0}>
                {/* 切换 tab */}
                <Tabs value={tab} onChange={setTab}>
                    <Tabs.List>
                        {Object.keys(TABS).map((key) => (
                            <Tabs.Tab key={key} value={key}>
                                {TABS[key].label}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>

                <Group justify="space-between">
                    <Text c="dimmed" size="sm">
                        {rows.length} records
                    </Text>
                    {!isUsers && (
                        <Button size="xs" onClick={openAdd}>
                            + Add
                        </Button>
                    )}
                </Group>

                {/* 资料表格：窄屏可以左右滑 */}
                <ScrollArea>
                    <Table withTableBorder miw={500}>
                        <Table.Thead>
                            <Table.Tr>
                                {fields.map((f) => (
                                    <Table.Th key={f}>{f}</Table.Th>
                                ))}
                                <Table.Th />
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows.map((row) => (
                                <Table.Tr key={row._id}>
                                    {fields.map((f) => (
                                        <Table.Td key={f}>
                                            <Text size="sm" truncate maw={110}>
                                                {row[f]}
                                            </Text>
                                        </Table.Td>
                                    ))}
                                    <Table.Td>
                                        <Group gap={6} wrap="nowrap">
                                            {!isUsers && (
                                                <ActionIcon variant="light" color="yellow" onClick={() => openEdit(row)}>
                                                    <FaPencilAlt size={14} />
                                                </ActionIcon>
                                            )}
                                            <ActionIcon variant="light" color="red" onClick={() => handleDelete(row._id)}>
                                                <FaTrash size={14} />
                                            </ActionIcon>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Stack>

            {/* 新增/编辑共用的表单：输入框按 fields 自动生成(后端会把文字转成数字并检查) */}
            <Modal opened={opened} onClose={close} title={editingId ? "Edit" : "Add"} centered>
                <Stack>
                    {fields.map((f) => (
                        <TextInput key={f} label={f} value={form[f] ?? ""} onChange={(e) => setForm({ ...form, [f]: e.currentTarget.value })} />
                    ))}
                    <Button onClick={handleSave}>Save</Button>
                </Stack>
            </Modal>
        </Stack>
    );
}

export default AdminDashboard;
