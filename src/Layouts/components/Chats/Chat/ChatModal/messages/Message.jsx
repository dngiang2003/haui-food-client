/* eslint-disable jsx-a11y/img-redundant-alt */
import { useSelector } from 'react-redux';
import { Avatar, Typography } from '@mui/material';

import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const authUser = useSelector((state) => state.auth.user);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  const profilePic = fromMe ? authUser?.avatar : selectedConversation?.avatar;

  const createdAt = new Date(message.createdAt);
  const gio = createdAt.getHours().toString().padStart(2, '0');
  const phut = createdAt.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${gio}:${phut}`;

  return (
    <>
      <div
        style={{
          float: fromMe ? 'right' : 'left',
          maxWidth: '60%',
          clear: 'both',
          margin: '0 0 10px 0',
          display: 'flex',
          alignItems: 'end',
        }}
      >
        {!fromMe ? (
          <Avatar
            className="avatar"
            src={profilePic}
            alt="Avatar"
            style={{
              width: '28px',
              height: '28px',
            }}
          />
        ) : null}
        <div
          style={{
            backgroundColor: message.image ? 'none' : fromMe ? '#00ba5133' : '#f0f0f0',
            padding: message.image ? '0' : '7px 20px',
            borderRadius: '20px',
            width: '100%',
            margin: '0 0 0 10px',
            fontSize: '17px',
            wordBreak: 'break-word',
            hyphens: 'auto',
            textAlign: fromMe ? 'right' : 'left',
          }}
        >
          {message.image && (
            <img
              src={message.image}
              alt="image"
              style={{
                width: '100%',
                borderRadius: '5px',
              }}
            />
          )}
          {message.message ? message.message : null}
        </div>
      </div>
      <Typography
        variant="caption"
        style={{
          clear: 'both',
          opacity: 0.5,
          display: 'block',
          fontSize: '1.3rem',
          textAlign: fromMe ? 'right' : 'left',
          margin: fromMe ? '0 2px 20px 0' : '0 0 20px 2px',
        }}
      >
        {formattedTime}
      </Typography>
    </>
  );
};

export default Message;
