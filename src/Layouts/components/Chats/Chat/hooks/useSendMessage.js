import Cookies from 'js-cookie';
import { useState } from 'react';

import { callApi } from '~/apiService/apiUtils';
import useConversation from '../zustand/useConversation';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const receiverId = selectedConversation._id;

  const sendMessage = async (message, image) => {
    setLoading(true);
    try {
      const messageData = new FormData();
      messageData.append('receiverId', receiverId);
      messageData.append('message', message);
      if (image) {
        messageData.append('image', image);
      }

      const customHeaders = {
        'accept-language': `${Cookies.get('lang')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await callApi('post', `/v1/chats/send`, null, messageData, customHeaders);

      const { data } = response;
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
