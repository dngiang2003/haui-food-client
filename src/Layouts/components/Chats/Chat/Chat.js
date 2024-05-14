import { Box, Modal } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import Sidebar from './ChatModal/sidebar/Sidebar';
import { useChatContext } from './context/ChatContext';
import MessageContainer from './ChatModal/messages/MessageContainer';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Chat = () => {
  const { isOpen, closeModal, openModal } = useChatContext();
  const navigator = useNavigate();
  const authUser = JSON.parse(localStorage.getItem('user'));
  const handleOpenModal = () => {
    if (!authUser) {
      return navigator('/auth/login');
    }
    openModal();
  }
  return (
    <>
      <div className={cx('chat')} onClick={handleOpenModal}>
        <ChatIcon className={cx('chat__icon')} />
        <p className={cx('chat__text')}>Tin nhắn</p>
      </div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        style={{
          zIndex: 9999999999
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: { xs: '60%', md: 450, lg: 550 },
            width: { xs: '100%', md: 550, lg: 750 },
            borderRadius: '0.7rem',
            backgroundColor: 'white',
            backdropFilter: 'blur(10px)',
            backgroundClip: 'padding-box',
            position: 'absolute',
            right: { xs: '0', md: '6.3vw', xl: '6.4vw' },
            bottom: { xs: '0', md: '84px', xl: '84px' },
            outline: 'none',
          }}
        >
          <Sidebar />
          <MessageContainer />
        </Box>
      </Modal>
    </>
  );
};

export default Chat;
