import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { styled } from '@mui/system';
import { IconButton, InputAdornment, TextField, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useSendMessage from '../../hooks/useSendMessage';

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
    padding: '8px 14px',
    fontSize: '1.6rem',
    '&::placeholder': {
      fontSize: '1.5rem',
    },
  },
});

const MessageInput = () => {
  const { t } = useTranslation();

  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  };

  return (
    <form className="px-2 my-3" onSubmit={handleSubmit}>
      <StyledTextField
        variant="outlined"
        fullWidth
        placeholder={t('chatMessage.desc04')}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" disabled={loading} style={{ color: 'var(--primary-bg)', fontSize: '1.6rem' }}>
                {loading ? (
                  <CircularProgress size={20} style={{ color: 'var(--primary-bg)' }} />
                ) : (
                  <BsSend className="w-5 h-5 text-white opacity-50 " size={18} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default MessageInput;
