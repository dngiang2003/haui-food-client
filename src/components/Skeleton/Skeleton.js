import classNames from 'classnames/bind';
import style from './Skeleton.module.scss';

const cx = classNames.bind(style);

function Skeleton() {
  const skeletonItems = Array.from({ length: 8 }, (_, index) => (
    <div key={index} className={cx('col-xl-3', 'col-6')}>
      <div className={cx('item-container')}>
        <div className={cx('placeholder', 'img')}></div>
        <div className={cx('placeholder', 'title')}></div>
        <div className={cx('placeholder', 'categories')}></div>
        <div className={cx('placeholder', 'content')}></div>
        {/* <div className={cx('placeholder', 'promo')}></div> */}
      </div>
    </div>
  ));

  return (
    <div className={cx('skeleton')}>
      <div className={cx('container')}>
        <div className={cx('row g-4')}>{skeletonItems}</div>
      </div>
    </div>
  );
}

export default Skeleton;
