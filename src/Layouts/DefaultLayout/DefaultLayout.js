import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';

import Header from '~/Layouts/components/Header';
import Footer from '~/Layouts/components/Footer';
import GoToTop from '~/Layouts/components/GoToTop';
import Chats from '../components/Chats';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('content')}>{children}</div>
      <Footer />
      <Chats />
      <GoToTop />
    </div>
  );
}

export default DefaultLayout;
