import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { BsEmojiSmileFill, BsSend, BsImageFill } from 'react-icons/bs';
import { IconButton, InputAdornment, TextField, CircularProgress } from '@mui/material';

import useSendMessage from '../../hooks/useSendMessage';

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 0.5rem;
    & fieldset {
      border-color: transparent;
    }
    &:hover fieldset {
      border-color: transparent;
    }
    &.Mui-focused fieldset {
      border-color: transparent;
    }
    & .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
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
  grid-template-columns: auto 1fr;
  padding: 0 1rem;
  position: relative;
  border-radius: 0.5rem;
  height: 35%;
  align-items: center;
  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    .emoji {
      position: relative;
      margin-top: 10px;
      svg {
        font-size: 1.8rem;
        color: var(--primary-bg);
        cursor: pointer;
        margin: 0 3px;
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

    .input-with-image {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }

    .preview-image {
      max-height: 100px;
      margin-left: 10px;
    }
  }
`;

const MessageInput = ({ conversationId }) => {
  const { t } = useTranslation();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const { loading, sendMessage } = useSendMessage();
  const emojiPickerRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !imageFile) return;
    await sendMessage(message, imageFile ? imageFile.file : null);
    setMessage('');
    setImageFile(null);
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

  useEffect(() => {
    setImageFile(null);
  }, [conversationId]);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject, event) => {
    if (emojiObject && emojiObject.emoji) {
      setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    }
  };


  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file ? { url: URL.createObjectURL(file), file } : null);
  };

  const handleImagePreviewClick = () => {
    setImageFile(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji" ref={emojiPickerRef}>
          <BsImageFill onClick={handleImageClick} />
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <Picker onEmojiClick={handleEmojiClick} style={{ width: '100%' }}/>
            </div>
          )}
        </div>
      </div>
      <form className="px-2 my-3" onSubmit={handleSubmit}>
        <div className="input-with-image" 
        style={{
          border: '1px solid var(--primary-bg)', 
          borderRadius: '0.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'start', 
          position: 'relative',
          marginTop: '5px',
          width: '100%',
        }}>
          {imageFile && (
            <div className="preview-image" onClick={handleImagePreviewClick}>
              <img src={imageFile.url} alt="Preview" style={{ maxHeight: '65px', marginTop: '10px', borderRadius: '0.5rem' }} />
            </div>
          )}
          <StyledTextField
            className="input"
            variant="outlined"
            fullWidth
            placeholder={t('chatMessage.desc04')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" disabled={loading} style={{ color: 'var(--primary-bg)', fontSize: '1.6rem' }}>
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
        </div>
        <input type="file" accept='image/*' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      </form>
    </Container>
  );
};

export default MessageInput;
