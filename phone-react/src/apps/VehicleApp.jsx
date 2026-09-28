import { Stack, SimpleGrid, Card, Group, Image, Text, Badge } from "@mantine/core";
import AppStatus from "./AppStatus";

function VehicleApp({ onClose }) {
    return (
        <Stack style={{ flex: 1, backgroundColor: "#DCDADD" }}>
            <AppStatus title="Vehicle Shop" onClose={onClose} />

            {/* 手机框很窄，一行放 2 张就好 */}
            <SimpleGrid cols={3} spacing="sm" p="sm">
                <Card shadow="sm" padding="sm" radius="md" withBorder>
                    {/* ===== 第 1 层：Logo + 引擎/里程（横排）===== */}
                    <Group justify="space-between" wrap="nowrap">
                        <Text>BMW</Text>
                        <Text size="xs" c="dimmed">
                            3.5L V6 - 124,200 Miles
                        </Text>
                    </Group>

                    {/* ===== 第 2 层：车的图片 ===== */}
                    <Card.Section my="sm">
                        <Image src="https://mediapool.bmwgroup.com/cache/P9/202404/P90548594/P90548594-the-all-new-bmw-m4-cs-05-2024-600px.jpg" h={120} fallbackSrc="https://placehold.co/600x400?text=Car" />
                    </Card.Section>

                    {/* ===== 第 3 层：名字 + 价格（横排，价格靠右）===== */}
                    <Group justify="space-between" wrap="nowrap">
                        <Text fw={700} size="sm">
                            2026 BMW M4 Competition
                        </Text>
                        <Badge color="red" radius="sm" size="lg">
                            $6,249
                        </Badge>
                    </Group>
                </Card>
            </SimpleGrid>
        </Stack>
    );
}

export default VehicleApp;
