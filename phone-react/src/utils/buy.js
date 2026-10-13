import { notifications } from "@mantine/notifications"; 
import { API_URL } from "../config"; 

// 三个商店共用的买东西函数
// type = "Car" / "House" / "Luxury"，id = 那件东西的 _id
export async function buyItem(type, id) {
    const res = await fetch(`${API_URL}/assets/buy`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // 有 body，要说是 JSON
            Authorization: "Bearer " + localStorage.getItem("token"), // 带 token，后端才知道是谁买
        },
        body: JSON.stringify({ type, id }), // 只传种类和 id，价钱后端自己查(防止被改)
    });

    const data = await res.json();

    // 后端拒绝(钱不够...)：弹红色提示 + 后端给的原因
    if (!res.ok) {
        return notifications.show({ position: "top-left", title: "Purchase failed", message: data.message, color: "red" });
    }

    localStorage.setItem("balance", data.balance); 

    notifications.show({ position: "top-left", title: "Purchased", message: "You bought " + data.asset.name, color: "green" });
}
