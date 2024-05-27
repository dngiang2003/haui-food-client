import classNames from 'classnames/bind';
import { Box, Modal } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Chat.module.scss';
import Sidebar from './ChatModal/sidebar/Sidebar';
import { useChatContext } from './context/ChatContext';
import MessageContainer from './ChatModal/messages/MessageContainer';

const cx = classNames.bind(styles);

const Chat = () => {
  const { t } = useTranslation();

  const { isOpen, closeModal, openModal } = useChatContext();
  const navigator = useNavigate();
  const authUser = JSON.parse(localStorage.getItem('user'));
  const handleOpenModal = () => {
    if (!authUser) {
      return navigator('/auth/login');
    }
    openModal();
  };
  return (
    <>
      <div className={cx('chat')} onClick={handleOpenModal}>
        <ChatIcon className={cx('chat__icon')} />
        <p className={cx('chat__text')}>{t('chatMessage.title01')}</p>
      </div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ zIndex: 9999 }}
      >
        <Box className={cx('chat__modal')}>
          <Sidebar />
          <MessageContainer />
        </Box>
      </Modal>
    </>
  );
};

export default Chat;
