import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
   const { selectedConversation } = useConversation();
   const hidden = selectedConversation ? "block" : "hidden";
   const visible = !selectedConversation ? "block" : "hidden";

   return (
      <div className="flex h-[90%] w-full sm:w-[80%] overflow-hidden bg-gray-400 bg-opacity-0 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg">
         <div className={`w-full ${visible} sm:block` }>
            <Sidebar />
         </div>

         <div className={`w-full ${hidden} sm:block`}>
            <MessageContainer />
         </div>
      </div>
   );
};
export default Home;
