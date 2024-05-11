import classNames from 'classnames/bind';
import style from './Loader.module.scss';
import { memo } from 'react';

const cx = classNames.bind(style);
function Loader({ className }) {
  return <div className={cx('loader', className)}></div>;
}
export default memo(Loader);
