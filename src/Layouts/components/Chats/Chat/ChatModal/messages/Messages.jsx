import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import useListenMessages from '../../hooks/useListenMessages';
import MessageSkeleton from '../../skeletons/MessageSkeleton';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);
  
  return (
    <Box
      className="px-4"
      style={{ maxHeight: '82%', overflowY: 'auto', overflowX: 'hidden', height: '62%', marginTop: '8px' }}
    >
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <Typography
          variant="body1"
          component="p"
          style={{
            textAlign: 'center',
            color: 'var(--primary-bg)',
            fontSize: '1.4rem',
            fontWeight: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          Send a message to start the conversation
        </Typography>
      )}
    </Box>
  );
};

export default Messages;
