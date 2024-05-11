import React, { useState } from 'react';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import classNames from 'classnames/bind';
import Modal from '@mui/material/Modal';

import styles from './ChatBot.module.scss';
import ChatModal from './ChatModal';

const cx = classNames.bind(styles);

const ChatBot = () => {
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
        <p className={cx('chat-bot__text')}>Trợ lý</p>
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
