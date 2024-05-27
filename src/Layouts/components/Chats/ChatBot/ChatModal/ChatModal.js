import Cookies from 'js-cookie';
import { Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames/bind';
import styles from './ChatModal.module.scss';
import { callApi } from '~/apiService/apiUtils';

const cx = classNames.bind(styles);

const ChatModal = () => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedMessages = JSON.parse(sessionStorage.getItem('chatMessages'));
    if (savedMessages) {
      setMessages(savedMessages);
    }
  }, []);

  const saveMessagesToSessionStorage = (messages) => {
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
  };

  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (messageInput) {
      const newMessage = { user: 'User', message: messageInput };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput('');
      setLoading(true);

      try {
        const customHeaders = {
          'accept-language': `${Cookies.get('lang')}`,
        };

        const response = await callApi('post', `/v1/chat-bots`, null, { message: messageInput }, customHeaders);

        const { data } = response;
        const chatbotResponse = { user: 'Chatbot', message: data };
        setMessages((prevMessages) => [...prevMessages, chatbotResponse]);
      } catch (error) {
        console.error('Error fetching chatbot response:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    saveMessagesToSessionStorage(messages);
  }, [messages]);

  return (
    <div className={cx('chat-modal')}>
      <Typography variant="h6" className={cx('chat-modal__title')}>
        {t('chatBot.title02')}
      </Typography>
      <div className={cx('chat-modal__messages')}>
        {messages.length > 0 &&
          messages.map((message, key) => (
            <div key={key}>
              <Typography
                variant="body1"
                fontSize={{ fontSize: 15 }}
                className={cx(
                  'chat-modal__message',
                  message.user === 'User' ? 'chat-modal__message--user' : 'chat-modal__message--chatbot',
                )}
              >
                {message.message}
              </Typography>
            </div>
          ))}
        {loading && (
          <div className={cx('chat-modal__loading')}>
            <div className={cx('dot')}></div>
            <div className={cx('dot')}></div>
            <div className={cx('dot')}></div>
          </div>
        )}
      </div>
      <hr className={cx('chat-modal__divider')} />
      <div className={cx('chat-modal__container')}>
        <input
          type="text"
          className={cx('chat-modal__input')}
          value={messageInput}
          onChange={handleChange}
          placeholder={t('chatBot.desc01')}
          onKeyDown={handleKeyPress}
        />
        <button type="submit" onClick={handleSendMessage} className={cx('chat-modal__button')}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
