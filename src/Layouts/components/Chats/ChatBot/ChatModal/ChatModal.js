import axios from 'axios';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import classNames from 'classnames/bind';
import styles from './ChatModal.module.scss';

const cx = classNames.bind(styles);

const ChatModal = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (messageInput) {

      setMessages(messages => [...messages, { user: 'User', message: messageInput }]);

      setMessageInput('');

      try {
        const response = await axios.post('https://api.hauifood.com/api/v1/chat-bots', {
          message: messageInput,
        });

        setMessages(messages => [...messages, { user: 'Chatbot', message: response.data.data }]);
      } catch (error) {
        console.error('Error fetching chatbot response:', error);
      }
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={cx('chat-modal')}>
      <Typography variant="h6" className={cx('chat-modal__title')}>
        Trợ lý AI
      </Typography>
      <div className={cx('chat-modal__messages')}>
        {messages.length > 0 && messages.map((message, key) => (
          <div key={key}>
            <Typography
              variant="body1"
              fontSize={{ fontSize: 13 }}
              className={cx("chat-modal__message", message.user === 'User' ? 'chat-modal__message--user' : 'chat-modal__message--chatbot')}
            >
              {message.message}
            </Typography>
          </div>
        ))}
      </div>
      <div className={cx('chat-modal__container')}>
        <input type="text"
          className={cx('chat-modal__input')}
          value={messageInput}
          onChange={handleChange}
          placeholder='Nhập nội dung chat'
          onKeyPress={handleKeyPress}
        />
        <button type="submit" onClick={handleSendMessage} className={cx('chat-modal__button')}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
