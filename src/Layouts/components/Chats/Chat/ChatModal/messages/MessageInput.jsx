import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { IconButton, InputAdornment, TextField } from '@mui/material';

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

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <TextField
        style={{ margin: '30px 0 10px 0' }}
        variant='outlined'
        fullWidth
        placeholder='Send a message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton type='submit' disabled={loading}>
                {loading ? <span className='loading loading-spinner'></span> : <BsSend className='w-5 h-5 text-white opacity-50 ' />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </form>
  );
};

export default MessageInput;
