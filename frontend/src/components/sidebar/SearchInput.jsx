import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";

const SearchInput = () => {
   const [search, setSearch] = useState('');
   const { conversations } = useGetConversations();
   const { setSelectedConversation } = useConversation();

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!search) return;
      if (search.length < 3)
         return toast.error("Search must be at least 3 characters");

      const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));
      if (!conversation) {
         return toast.error(`No user found with the name ${search}`);
      } else {
         setSelectedConversation(conversation);
         setSearch('');
      }
   };
   return (
      <form
         onSubmit={handleSubmit}
         className="flex items-center w-full gap-2">
         <input
            type="text"
            placeholder="Search…"
            className="rounded-full w-[90%] input input-bordered"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
         <button
            type="submit"
            className="text-white btn btn-circle bg-sky-500">
            <IoSearchSharp className="w-6 h-6 outline-none" />
         </button>
      </form>
   );
};
export default SearchInput;
