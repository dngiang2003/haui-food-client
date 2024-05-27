import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { callApi } from '~/apiService/apiUtils';
const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      const user = localStorage.getItem('user');

      setLoading(true);
      try {
        const parsedUser = JSON.parse(user);
        const customHeaders = {
          'accept-language': `${Cookies.get('lang')}`,
        };

        const response = await callApi('post', `/v1/chats/users`, null, { userId: parsedUser._id }, customHeaders);

        const { data } = response;
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        console.error('Failed to fetch conversations:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations, setConversations };
};

export default useGetConversations;
