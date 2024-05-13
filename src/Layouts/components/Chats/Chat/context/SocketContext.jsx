import io from 'socket.io-client';
import { createContext, useState, useEffect, useContext } from 'react';

import { useAuthContext } from './AuthContext';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        const initializeSocket = () => {
            const newSocket = io('https://haui-food-api.onrender.com/', {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(newSocket);

            newSocket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
            });

            return () => newSocket.close();
        };

        if (authUser) {
            initializeSocket();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
