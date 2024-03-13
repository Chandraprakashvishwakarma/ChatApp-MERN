import useConversations from "../zustand/useConversation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetMessages = () => {
   const { messages, setMessages, selectedConversation } = useConversations();
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const getMessages = async () => {
         setLoading(true);
         try {
            const res = await fetch(
               "/api/message/" + selectedConversation?._id
            );
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setMessages(data);
         } catch (error) {
            toast.error(error.messages);
         } finally {
            setLoading(false);
         }
      };
      if (selectedConversation?._id) getMessages();
   }, [selectedConversation?._id, setMessages]);
   return { loading, messages };
};

export default useGetMessages;
