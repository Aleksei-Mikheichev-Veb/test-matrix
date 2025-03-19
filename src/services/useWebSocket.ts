import { useEffect, useState } from "react";

const useWebSocket = (url: string) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => console.log("WebSocket connected");
        ws.onerror = (error) => console.error("WebSocket error:", error);
        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                setData(message.data);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        return () => ws.close();
    }, [url]);

    return { data };
};

export default useWebSocket;
