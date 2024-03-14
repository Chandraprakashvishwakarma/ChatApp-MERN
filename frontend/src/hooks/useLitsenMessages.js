import { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notificationSound.wav"

const useLitsenMessages = () => {
   const { socket } = useSocketContext();
   const { messages, setMessages } = useConversation();

   useEffect(() => {
      socket?.on("newMessage", (newMessage) => {
        const sound  = new Audio(notificationSound);
        sound.play();
         setMessages([...messages, newMessage]);
        
      });
      return () => socket?.off("newMessage");
   }, [socket, setMessages, messages]);
};

export default useLitsenMessages;
