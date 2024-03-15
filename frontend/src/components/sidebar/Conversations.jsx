import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./Conversation";

const Conversations = () => {
   const { loading, conversations } = useGetConversations();
   return (
      <div className="flex flex-col w-full py-2 overflow-auto ">
         {conversations.map((conversation, index) => {
            return (
               <Conversation
                  key={conversation._id}
                  conversation={conversation}
                  emoji={getRandomEmoji()}
                  lastIdx={index === conversations.length - 1}
               />
            );
         })}

         {loading ? (
           <span className="loading loading-spinner"></span>
         ) : (
            null
         )}
      </div>
   );
};
export default Conversations;
