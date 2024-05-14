import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { styled } from '@mui/system';
import { IconButton, InputAdornment, TextField, CircularProgress } from '@mui/material';

import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  };

  const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
      '& fieldset': {
        borderColor: 'var(--primary-bg)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--primary-bg)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--primary-bg)',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--primary-bg)',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 14px',
    },
  });

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <StyledTextField
        variant='outlined'
        fullWidth
        placeholder='Send a message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton type='submit' disabled={loading} style={{ color: 'var(--primary-bg)' }}>
                {loading ? <CircularProgress size={24} /> : <BsSend className='w-5 h-5 text-white opacity-50 ' />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </form>
  );
};

export default MessageInput;
