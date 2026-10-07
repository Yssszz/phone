import styles from "../components/HomeScreen.module.css";
import { SimpleGrid, Image, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import SettingIcon from "../assets/Settings.png";
import NikeIcon from "../assets/IOS5_Nike.png";
import Stats from "../assets/Stats.png";
import Veh from "../assets/Veh.png";
import leadBoard from "../assets/leadboard.png";
import paypal from "../assets/paypal.png";
import Home from "../assets/Home.png";
import Hacker from "../assets/hacker.png";
import Stocks from "../assets/Stocks.png";

function HomeScreen({ onOpenApp }) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isAdmin = localStorage.getItem("role") === "admin";

    return (
        <SimpleGrid cols={isMobile ? 4 : 5} spacing="md" style={{ flex: 1, padding: 16, textAlign: "center", alignContent: "start" }}>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("Information")}>
                <Image radius="md" h={60} w={60} src={Stats} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Information</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon}>
                <Image radius="md" h={60} w={60} src={NikeIcon} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Nike+</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("vehicle")}>
                <Image radius="md" h={60} w={60} src={Veh} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Vehicle</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon}>
                <Image radius="md" h={60} w={60} src={leadBoard} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Leaderboard</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon}>
                <Image radius="md" h={60} w={60} src={paypal} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>PayPal</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon}>
                <Image radius="md" h={60} w={60} src={Home} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Home</Text>
            </Stack>
            {isAdmin && (
                <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("hacker")}>
                    <Image radius="md" h={60} w={60} src={Hacker} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                    <Text>DarkWeb</Text>
                </Stack>
            )}

            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("stocks")}>
                <Image radius="md" h={60} w={60} src={Stocks} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Stocks</Text>
            </Stack>
        </SimpleGrid>
    );
}

export default HomeScreen;
