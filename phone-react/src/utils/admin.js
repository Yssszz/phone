import { notifications } from "@mantine/notifications";

// check shi bushi admin
export const isAdmin = () => localStorage.getItem("role") === "admin";

// 
export async function deleteItem(url, id) {
    if (!window.confirm("Delete this item?")) return false;

    const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }, // 后端检查是不是 admin
    });
    const data = await res.json();

    if (!res.ok) {
        notifications.show({ position: "top-left", title: "Delete failed", message: data.message, color: "red" });
        return false;
    }

    notifications.show({ position: "top-left", title: "Deleted", message: "Item removed", color: "green" });
    return true;
}
