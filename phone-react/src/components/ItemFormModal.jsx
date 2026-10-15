import { Modal, Stack, TextInput, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

// 新增/编辑共用的表单：item = null 是新增，有 item 是编辑
// fields = 要填的栏位，例如 ["name", "price", "image"]；存成功后 onSaved(后端回传的那笔)
function ItemFormModal({ opened, onClose, url, fields, item, onSaved }) {
    const [form, setForm] = useState({});

    // 每次打开：编辑就放入原本资料，新增就清空
    useEffect(() => {
        if (opened) setForm(item || {});
    }, [opened]);

    const handleSave = async () => {
        const isEditing = item !== null;

        const res = await fetch(isEditing ? `${url}/${item._id}` : url, {
            method: isEditing ? "PUT" : "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
            body: JSON.stringify(form),
        });
        const data = await res.json();

        if (!res.ok) {
            return notifications.show({ position: "top-left", title: "Save failed", message: data.message, color: "red" });
        }

        onSaved(data);
        onClose();
        notifications.show({ position: "top-left", title: "Saved", message: "Done", color: "green" });
    };

    return (
        <Modal opened={opened} onClose={onClose} title={item ? "Edit" : "Add"} centered>
            <Stack>
                {fields.map((f) => (
                    <TextInput key={f} label={f} value={form[f] ?? ""} onChange={(e) => setForm({ ...form, [f]: e.currentTarget.value })} />
                ))}
                <Button onClick={handleSave}>Save</Button>
            </Stack>
        </Modal>
    );
}

export default ItemFormModal;
