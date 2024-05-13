import axios from 'axios';
import { useEffect, useState } from 'react';

import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.post('https://api.hauifood.com/api/v1/chats', {
                    senderId: user._id,
                    receiverId: selectedConversation._id
                }, {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                });
                const { data } = await res.data;
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
