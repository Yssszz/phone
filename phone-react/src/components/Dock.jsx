import { Group, Text, Image } from "@mantine/core";
import PhotoIcon from "../assets/Photos.png";
import SettingIcon from "../assets/Settings.png";
import PhoneIcon from "../assets/Phone.png";
import Styles from "../components/Dock.module.css";
import Stats from "../assets/Stats.png";

function Dock() {
    return (
        <Group
            justify="space-between"
            align="center"
            px={8}
            style={{
                height: 40,
                background: "linear-gradient(to bottom, #2f7fe8 0%, #1358c9 50%, #0a3fa0 100%)",
                borderTop: "1px solid #6fa8f0",
            }}
        >
            <Group
                gap={6}
                px={12}
                style={{
                    height: 30,
                    background: "linear-gradient(to bottom, #6fe066 0%, #2fa62a 50%, #1c7a18 100%)",
                    borderRadius: "0 14px 14px 0",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
                }}
            >
                <Text fw={700} fs="italic" c="white" size="sm">
                    start
                </Text>
            </Group>

            <Group gap={12}>
                <Group>
                    <Image radius="md" h={30} w={30} src={SettingIcon} fallbackSrc="https://placehold.co/600x400?text=Placeholder" className={Styles.DockIcon} />
                </Group>

                <Group>
                    <Image radius="md" h={30} w={30} src={Stats} fallbackSrc="https://placehold.co/600x400?text=Placeholder" className={Styles.DockIcon} />
                </Group>

                <Group>
                    <Image radius="md" h={30} w={30} src={PhotoIcon} fallbackSrc="https://placehold.co/600x400?text=Placeholder" className={Styles.DockIcon} />
                </Group>
            </Group>
        </Group>
    );
}

export default Dock;
