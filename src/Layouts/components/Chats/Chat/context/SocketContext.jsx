import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import React, { createContext, useState, useEffect, useContext } from 'react';

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const authUser = useSelector((state) => state.auth.user);
    useEffect(() => {
        if (authUser) {
            const newSocket = io('https://api.hauifood.com', {
                query: { userId: authUser._id },
            });

            newSocket.on('getOnlineUsers', setOnlineUsers);

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        } else if (socket) {
            socket.close();
            setSocket(null);
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
