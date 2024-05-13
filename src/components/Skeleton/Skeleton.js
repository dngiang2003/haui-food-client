import classNames from 'classnames/bind';

import style from './Skeleton.module.scss';

const cx = classNames.bind(style);

function Skeleton({ listOrder = false }) {
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

  const orderItems = Array.from({ length: 2 }, (_, index) => (
    <div key={index} className={cx()}>
      <div className={cx('order-item-container')}>
        <div className={cx('order-item__shop-name-container')}>
          <div className={cx('placeholder', 'order-item__shop-name')}></div>
        </div>
        <div className={cx('order__product-info-container')}>
          <div className={cx('placeholder', 'order__product__img')}></div>
          <div className={cx('order__product-info')}>
            <div className={cx('placeholder', 'order__product-name')}></div>
            <div className={cx('placeholder', 'order__product-desc')}></div>
            <div className={cx('placeholder', 'order__product-quantity')}></div>
          </div>
          <div className={cx('placeholder', 'order__product-price')}></div>
        </div>
        <div className={cx('placeholder', 'order__product-content')}></div>
        {/* <div className={cx('placeholder', 'promo')}></div> */}
      </div>
    </div>
  ));

  return (
    <div className={cx('skeleton')}>
      {listOrder ? (
        <div>{orderItems}</div>
      ) : (
        <div className={cx('container')}>
          <div className={cx('row g-4')}>{skeletonItems}</div>
        </div>
      )}
    </div>
  );
}

export default Skeleton;
