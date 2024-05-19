import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { BsEmojiSmileFill, BsSend } from 'react-icons/bs';
import { IconButton, InputAdornment, TextField, CircularProgress } from '@mui/material';

import useSendMessage from '../../hooks/useSendMessage';

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 0.5rem;
    & fieldset {
      border-color: var(--primary-bg);
    }
    &:hover fieldset {
      border-color: var(--primary-bg);
    }
    &.Mui-focused fieldset {
      border-color: var(--primary-bg);
    }
    & .MuiOutlinedInput-notchedOutline {
      border-color: var(--primary-bg);
    }
  }
  & .MuiOutlinedInput-input {
    padding: 8px 14px;
    font-size: 1.6rem;
    &::placeholder {
      font-size: 1.5rem;
    }
  }
`;

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  padding: 0 1rem;
  position: relative;
  border-radius: 0.5rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.8rem;
        color: var(--primary-bg);
        cursor: pointer;
      }

      .emoji-picker-container {
        position: absolute;
        bottom: calc(100% + 20px);
        left: 0;
        background-color: #080420;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        border-color: var(--primary-bg);
        z-index: 1000;
        border-radius: 0.82rem;
        overflow: hidden;
        @media screen and (max-width: 720px)  {
          left: -10rem;
          height: 400px;
          width: 300px;
        }
      }
    }
  }

  form {
    flex-grow: 1;
    display: flex;
    align-items: center;

    .MuiOutlinedInput-root {
      width: 100%;
    }
  }
`;

const MessageInput = () => {
  const { t } = useTranslation();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();
  const emojiPickerRef = useRef(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject, event) => {
    if (emojiObject && emojiObject.emoji) {
      setMessage(prevMessage => prevMessage + emojiObject.emoji);
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji" ref={emojiPickerRef}>
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <Picker style={{width: '100%'}}
                onEmojiClick={(event, emojiObject) => handleEmojiClick(event, emojiObject)}
              />
            </div>
          )}
        </div>
      </div>
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
                <IconButton
                  type="submit"
                  disabled={loading}
                  style={{ color: 'var(--primary-bg)', fontSize: '1.6rem' }}
                >
                  {loading ? (
                    <CircularProgress size={20} style={{ color: 'var(--primary-bg)' }} />
                  ) : (
                    <BsSend className="w-5 h-5 text-white opacity-50" size={18} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Container>
  );
};

export default MessageInput;
