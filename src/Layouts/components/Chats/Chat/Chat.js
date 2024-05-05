import ChatIcon from '@mui/icons-material/Chat';

import classNames from 'classnames/bind';

import styles from './Chat.module.scss';

const cx = classNames.bind(styles);
const Chat = () => {
  return (
    <div className={cx('chat')}>
      <ChatIcon className={cx('chat__icon')} />
      <p className={cx('chat__text')}>Tin nhắn</p>
    </div>
  )
}

export default Chat
