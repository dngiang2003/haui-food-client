import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './AuthLayout.module.scss';
import images from '~/assets/images';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('logo')}>
        <Link to={routes.home}>
          <img className={cx('logo__img')} src={images.logoVip2} alt="logo" />
        </Link>
      </div>
      <div className={cx('container')}>{children}</div>
    </div>
  );
}

export default AuthLayout;
