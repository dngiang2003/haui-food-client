import { useEffect } from "react";
import notificationSound from "~/assets/sounds/notification.mp3";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        });
        return () => {
            socket?.off("newMessage");
        };
    }, [socket, messages, setMessages]);
}

export default useListenMessages
