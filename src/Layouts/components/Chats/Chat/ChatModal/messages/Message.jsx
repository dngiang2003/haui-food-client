import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { Avatar, Typography } from '@mui/material';
import { PhotoProvider, PhotoView } from 'react-photo-view';

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

  const GlobalStyle = createGlobalStyle`
    .PhotoView-Portal {
      z-index: 9999 !important;
    }
    .PhotoView-Slider__Backdrop {
      background-color: rgba(0, 0, 0, 0.8) !important;
    }
    .PhotoView-Slider__toolbarIcon {
      cursor: pointer;
      fill: white;
      margin: 0 8px; 
    }
  `;

  return (
    <>
      <GlobalStyle />
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
            <PhotoProvider
              speed={() => 800}
              easing={(type) =>
                type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }
              toolbarRender={({ scale, onScale, rotate, onRotate }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <svg
                    class="PhotoView-Slider__toolbarIcon"
                    width="44"
                    height="44"
                    fill="white"
                    viewBox="0 0 768 768"
                    onClick={() => onRotate(rotate + 90)}
                  >
                    <path d="M565.5 202.5l75-75v225h-225l103.5-103.5c-34.5-34.5-82.5-57-135-57-106.5 0-192 85.5-192 192s85.5 192 192 192c84 0 156-52.5 181.5-127.5h66c-28.5 111-127.5 192-247.5 192-141 0-255-115.5-255-256.5s114-256.5 255-256.5c70.5 0 135 28.5 181.5 75z"></path>
                  </svg>
                  <svg
                    class="PhotoView-Slider__toolbarIcon"
                    width="44"
                    height="44"
                    viewBox="0 0 768 768"
                    fill="white"
                    onClick={() => onScale(scale + 1)}
                  >
                    <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z"></path>
                  </svg>
                  <svg
                    class="PhotoView-Slider__toolbarIcon"
                    width="44"
                    height="44"
                    viewBox="0 0 768 768"
                    fill="white"
                    onClick={() => onScale(scale - 1)}
                  >
                    <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z"></path>
                  </svg>
                </div>
              )}
            >
              <PhotoView src={message.image}>
                <img src={message.image} style={{ width: '100%', borderRadius: '5px' }} alt="images" />
              </PhotoView>
            </PhotoProvider>
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
