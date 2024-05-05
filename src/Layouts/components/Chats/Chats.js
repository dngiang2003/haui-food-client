import ChatBot from "./ChatBot"
import Chat from "./Chat"
import classNames from 'classnames/bind';

import styles from './Chats.module.scss';

const cx = classNames.bind(styles);

function Chats() {
  return (
    <section className={cx('chats')}>
      <ChatBot />
      <Chat />
    </section>
  )
}

export default Chats
