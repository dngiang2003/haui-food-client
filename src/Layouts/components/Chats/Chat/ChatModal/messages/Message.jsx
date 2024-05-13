import { Avatar, Typography } from '@mui/material';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  const profilePic = fromMe ? authUser?.avatar : selectedConversation?.avatar;

  const createdAt = new Date(message.createdAt);
  const gio = createdAt.getHours().toString().padStart(2, '0');
  const phut = createdAt.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${gio}:${phut}`;

  return (
    <>
      <div style={{
        float: fromMe ? 'right' : 'left',
        maxWidth: '60%',
        clear: 'both',
        margin: '0 0 10px 0',
        display: 'flex',
        alignItems: 'center',
      }}>
        {!fromMe ? <Avatar className='avatar' src={profilePic} alt='Avatar' style={{
          width: '28px',
          height: '28px',

        }} /> : null}
        <div style={{
          backgroundColor: fromMe ? '#2196f3' : '#f0f0f0',
          padding: '7px 20px',
          borderRadius: '20px',
          width: '100%',
          maxHeight: '200px',
          margin: '0 0 0 10px',
          fontSize: '15px',
        }}>
          {message.message}
        </div>
      </div>
      <Typography variant='caption' style={{ clear: 'both', opacity: 0.5, display: 'block', textAlign: fromMe ? 'right' : 'left', margin: fromMe ? '0 2px 20px 0' : '0 0 20px 2px' }}>
        {formattedTime}
      </Typography>
    </>
  );
}

export default Message;
