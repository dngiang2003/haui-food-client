// AppContext.js
import React, { createContext, useContext, useState } from 'react';

import useGetConversations from '../hooks/useGetConversations';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { conversations, setConversations } = useGetConversations();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const addConversation = (newConversation) => {
    setConversations([...conversations, newConversation]);
  };

  return (
    <ChatContext.Provider value={{ isOpen, openModal, closeModal, conversations, addConversation }}>
      {children}
    </ChatContext.Provider>
  );
};
