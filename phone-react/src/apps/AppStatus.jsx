// components/WindowTitleBar.jsx
import { Group, Text } from "@mantine/core";

function AppStatus({ title, onClose }) {
    const buttonBase = {
        width: 22,
        height: 22,
        borderRadius: 4,
        // border: "1.5px solid white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0 2px 3px rgba(255,255,255,0.6)",
        cursor: "pointer",
        color: "white",
        fontWeight: 700,
        fontSize: 12,
    };

    return (
        <Group
            justify="space-between"
            align="center"
            px={8}
            style={{
                height: 40,
                background: "linear-gradient(to bottom, #2f7fe8 0%, #1358c9 50%, #0a3fa0 100%)",
                color: "white",
            }}
        >
            <Text fw={700} size="sm">
                {title}
            </Text>

            <Group gap={4}>
                <div style={{ ...buttonBase, background: "linear-gradient(to bottom, #5aa4f0, #1a5fc4)" }}>_</div>
                <div style={{ ...buttonBase, background: "linear-gradient(to bottom, #5aa4f0, #1a5fc4)" }}>□</div>
                <div onClick={onClose} style={{ ...buttonBase, background: "linear-gradient(to bottom, #ff8f6b, #e2432a)" }}>
                    ✕
                </div>
            </Group>
        </Group>
    );
}

export default AppStatus;
