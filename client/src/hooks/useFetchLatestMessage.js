import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

        if (response.error) {
          throw console.error("Error getting messages...", error);
        }

        const lastMessage = response[response?.length - 1];

        setLatestMessage(lastMessage);
      } catch (error) {
        console.error("Get Message error", error);
      }
    };
    getMessage();
  }, [newMessage, notifications]);

  return { latestMessage };
};
