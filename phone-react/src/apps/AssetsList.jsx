import { Stack, Group, Text, RingProgress, Button, NumberFormatter } from "@mantine/core";
import { useState } from "react";

const assets = [
    { name: "Tesla Model S", price: 89990 },
    { name: "SpaceX Rocket", price: 62000000 },
    { name: "Nike Shoes", price: 120 },
];

function AssetList() {
    const [value, setValue] = useState(10);

    return (
        <Stack justify="center" gap={4}>
            {assets.map((item) => (
                <Group key={item.name} justify="center">
                    <Text>{item.name}</Text>
                    <Text>${item.price.toLocaleString()}</Text>
                </Group>
            ))}
        </Stack>
    );
}

export default AssetList;
