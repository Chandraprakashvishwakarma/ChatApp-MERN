
import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReceiverIdSocketId ,io } from "../socket/socket.js";

export const messageSend = async (req, res) => {
   try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      console.log(req.user);

      let conversation = await Conversation.findOne({
         participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
         conversation = await Conversation.create({
            participants: [senderId, receiverId],
         });
      }

      const newMessage = new Message({
         senderId,
         receiverId,
         message,
      });

      if (newMessage) {
         conversation.messages.push(newMessage._id);
      }

      await Promise.all([conversation.save(), newMessage.save()]);

      //Socket io functionality
      const receiverSocketId = getReceiverIdSocketId(receiverId);
      if (receiverSocketId) {
         //io.to(socketId).emit() is used to send event to perticular user
         io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      res.status(200).json(newMessage);
   } catch (error) {
      console.log("Internal Server Error! message: ", error.message);
      return res.status(400).json({ error: error.message });
   }
};

export const getMessage = async (req, res) => {
   try {
      const senderId = req.user._id;
      const { id: userToChatId } = req.params;

      const conversation = await Conversation.findOne({
         participants: { $all: [senderId, userToChatId] },
      }).populate("messages");

      if (!conversation) return res.status(200).json([]);
      const messages = conversation.messages;

      res.status(200).json(messages);
   } catch (error) {
      console.log("Internal Server Error! message: ", error.message);
      return res.status(400).json({ error: error.message });
   }
};
