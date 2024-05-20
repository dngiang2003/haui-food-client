import axios from 'axios';
import { useState } from 'react';

import useConversation from '../zustand/useConversation';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const receiverId = selectedConversation._id;
    const token = JSON.parse(localStorage.getItem('accessToken'));

    const sendMessage = async (message, image) => {
        setLoading(true);
        try {
            const messageData = new FormData();
            messageData.append('receiverId', receiverId);
            messageData.append('message', message);
            if (image) {
                messageData.append('image', image);
            }

            const res = await axios.post('https://api.hauifood.com/api/v1/chats/send', messageData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            const { data } = res.data;
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
