import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import ChatModal from './ChatModal';
import classNames from 'classnames/bind';
import styles from './ChatBot.module.scss';

const cx = classNames.bind(styles);

const ChatBot = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={cx('chat-bot')} onClick={handleOpen}>
        <SupportAgentIcon className={cx('chat-bot__icon')} />
        <p className={cx('chat-bot__text')}>{t('chatBot.title01')}</p>
      </div>
      <Modal
        sx={{ zIndex: 99999, fontSize: 24 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ChatModal />
      </Modal>
    </>
  );
};

export default ChatBot;
