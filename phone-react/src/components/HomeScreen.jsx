import styles from "../components/HomeScreen.module.css";
import { SimpleGrid, Image, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Stats from "../assets/icons/Stats.png";
import Veh from "../assets/icons/Veh.png";
import Home from "../assets/icons/Home.png";
import Dating from "../assets/icons/dating.png";
import Luxury from "../assets/icons/Luxury.png";

function HomeScreen({ onOpenApp }) {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <SimpleGrid cols={isMobile ? 4 : 5} spacing="md" style={{ flex: 1, padding: 16, textAlign: "center", alignContent: "start" }}>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("Information")}>
                <Image radius="md" h={60} w={60} src={Stats} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Information</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("luxury")}>
                <Image radius="md" h={60} w={60} src={Luxury} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Luxury</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("vehicle")}>
                <Image radius="md" h={60} w={60} src={Veh} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Vehicle</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("house")}>
                <Image radius="md" h={60} w={60} src={Home} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Home</Text>
            </Stack>
            <Stack align="center" gap={4} className={styles.appIcon} onClick={() => onOpenApp("dating")}>
                <Image radius="md" h={60} w={60} src={Dating} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
                <Text>Lovio</Text>
            </Stack>
        </SimpleGrid>
    );
}

export default HomeScreen;
