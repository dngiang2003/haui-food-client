import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newConversation, setNewConversation] = useState();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const addConversation = (newConversation) => {
    setNewConversation(newConversation);
  };

  return (
    <ChatContext.Provider value={{ isOpen, openModal, closeModal, newConversation, addConversation }}>
      {children}
    </ChatContext.Provider>
  );
};
