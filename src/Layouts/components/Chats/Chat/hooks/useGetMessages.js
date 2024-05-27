import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { callApi } from '~/apiService/apiUtils';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const customHeaders = {
          'accept-language': `${Cookies.get('lang')}`,
        };

        const response = await callApi(
          'post',
          `/v1/chats`,
          null,
          { senderId: user._id, receiverId: selectedConversation._id },
          customHeaders,
        );

        const { data } = response;
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
