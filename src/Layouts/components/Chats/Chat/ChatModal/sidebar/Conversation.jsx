import * as React from 'react';
import classNames from 'classnames/bind';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import styles from './Conversation.module.scss';

import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

const cx = classNames.bind(styles);

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: "''",
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  return (
    <>
      <ListItem
        className={cx('list-item')}
        button
        selected={isSelected}
        onClick={() => setSelectedConversation(conversation)}
        sx={{
          padding: '8px',
          borderRadius: '4px',
          '&:hover': {
            bgcolor: isSelected ? 'inherit' : 'sky.500',
          },
        }}
      >
        <ListItemAvatar sx={{ minWidth: '40px' }}>
          {isOnline ? (
            <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
              <Avatar className={cx('list-item__avatar')} alt="user avatar" src={conversation.avatar} />
            </StyledBadge>
          ) : (
            <Avatar className={cx('list-item__avatar')} alt="user avatar" src={conversation.avatar} />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={conversation.fullname}
          primaryTypographyProps={{
            variant: 'body1',
            color: 'text.primary',
            fontSize: '1.3rem',
            fontWeight: 600,
          }}
          secondary={emoji}
          secondaryTypographyProps={{
            variant: 'h5',
            color: 'text.secondary',
          }}
          sx={{ flex: 1 }}
        />
      </ListItem>

      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
