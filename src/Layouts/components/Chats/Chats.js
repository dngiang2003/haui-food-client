import classNames from 'classnames/bind';

import styles from './Chats.module.scss';

import ChatBot from "./ChatBot"
import Chat from "./Chat"

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
