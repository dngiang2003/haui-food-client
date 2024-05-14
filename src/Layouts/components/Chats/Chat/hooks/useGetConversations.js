import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            const token = localStorage.getItem('accessToken');
            const user = localStorage.getItem('user');

            if (!token || !user) return;

            setLoading(true);
            try {
                const parsedToken = JSON.parse(token);
                const parsedUser = JSON.parse(user);

                const res = await axios.post('https://api.hauifood.com/api/v1/chats/users', {
                    userId: parsedUser._id
                }, {
                    headers: {
                        'Authorization': `Bearer ${parsedToken}`
                    }
                });

                const { data } = res.data;
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
