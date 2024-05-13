import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const jwtString = localStorage.getItem('accessToken');
                const regex = /'([^']+)'/;
                const matches = jwtString.match(regex);
                const token = matches && matches[1];
                const user = JSON.parse(localStorage.getItem('user'));

                const res = await axios.post('https://haui-food-api.onrender.com/api/v1/chats/users', {
                    userId: user._id
                }, {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                });
                const { data } = res.data;
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations, setConversations };
};

export default useGetConversations;
