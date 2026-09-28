import { useMediaQuery } from "@mantine/hooks";

function PhoneFrame({ children }) {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#242424",
            }}
        >
            <div
                style={{
                    width: isMobile ? 320 : 1020,
                    height: isMobile ? 568 : 650,
                    maxHeight: "90vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 5,
                    // border: "2px solid black",
                    backgroundImage: "url(https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fb%2Fd%2F7%2F6%2F4%2Fb%2Fbd764bb25d49a05105060185774ba14cd2c846f7.jpg&w=4500&q=100",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default PhoneFrame;
