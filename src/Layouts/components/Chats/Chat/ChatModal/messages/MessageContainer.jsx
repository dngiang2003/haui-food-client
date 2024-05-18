import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { TiMessages } from 'react-icons/ti';
import { Avatar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styles from './MessageContainer.module.scss';

import Messages from './Messages';
import MessageInput from './MessageInput';
import useConversation from '../../zustand/useConversation';

const cx = classNames.bind(styles);

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return (
    <div className={cx('container')}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className={cx('container__heading')}>
            <Typography variant="body1" component="span" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              <Avatar
                className="avatar"
                src={selectedConversation.avatar}
                alt="Avatar"
                style={{
                  width: '30px',
                  height: '30px',
                }}
              />
            </Typography>
            <Typography
              variant="body1"
              component="span"
              style={{ fontWeight: 'bold', fontSize: '1.5rem', marginLeft: '1rem' }}
            >
              {selectedConversation.fullname}
            </Typography>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { t } = useTranslation();

  const authUser = useSelector((state) => state.auth.user);

  return (
    <div
      style={{
        paddingLeft: '1rem',
        paddingRight: '1rem',
        textAlign: 'center',
        color: 'var(--primary-bg)',
        fontWeight: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: '0.5rem',
      }}
    >
      <Typography variant="body1" component="h6" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        {t('chatMessage.desc02')} 👋 {authUser?.fullname} ❄
      </Typography>
      <Typography variant="body1" component="p" style={{ fontSize: '1.3rem' }}>
        {t('chatMessage.desc03')}
      </Typography>
      <TiMessages style={{ fontSize: '4rem' }} className="text-3xl md:text-6xl text-center" />
    </div>
  );
};
