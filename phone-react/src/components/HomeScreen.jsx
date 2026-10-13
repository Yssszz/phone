import styles from "../components/HomeScreen.module.css";
import { SimpleGrid, Image, Stack, Text, Center } from "@mantine/core";
import { MdDashboard, MdDiamond } from "react-icons/md"; // admin 面板 / 奢侈品店的图标
import { useMediaQuery } from "@mantine/hooks";
import Stats from "../assets/icons/Stats.png";
import Veh from "../assets/icons/Veh.png";
import Home from "../assets/icons/Home.png";
import Dating from "../assets/icons/dating.png";

function HomeScreen({ onOpenApp }) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isAdmin = localStorage.getItem("role") === "admin";

    return (
        <SimpleGrid cols={isMobile ? 4 : 5} spacing="md" style={{ flex: 1, padding: 16, textAlign: "center", alignContent: "start" }}>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("Information")}>
                <Image radius="md" h={60} w={60} src={Stats} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Information</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("luxury")}>
                <Center h={60} w={60} style={{ borderRadius: 12, background: "linear-gradient(to bottom, #f6d365, #c9971c)" }}>
                    <MdDiamond size={34} color="white" />
                </Center>
                <Text>Luxury</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("vehicle")}>
                <Image radius="md" h={60} w={60} src={Veh} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Vehicle</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("dating")}>
                <Image radius="md" h={60} w={60} src={Dating} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Lovio</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("house")}>
                <Image radius="md" h={60} w={60} src={Home} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Home</Text>
            </Stack>

            {isAdmin && (
                <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("admin")}>
                    <Center h={60} w={60} style={{ borderRadius: 12, background: "linear-gradient(to bottom, #4c6ef5, #364fc7)" }}>
                        <MdDashboard size={34} color="white" />
                    </Center>
                    <Text>Admin</Text>
                </Stack>
            )}  
        </SimpleGrid>
    );
}

export default HomeScreen;
