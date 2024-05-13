import axios from 'axios';
import { useState } from 'react';

import useConversation from '../zustand/useConversation';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const token = JSON.parse(localStorage.getItem('accessToken'));

    const senderId = JSON.parse(localStorage.getItem('user'))._id;
    const receiverId = selectedConversation._id;
    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await axios.post('https://api.hauifood.com/api/v1/chats/send', {
                senderId,
                receiverId,
                message
            }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            const { data } = await res.data;
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
