import classNames from 'classnames/bind';
import style from './ProductCard.module.scss';

const cx = classNames.bind(style);

function ProductCard({ data }) {
  return (
    <div className={cx('product__wrapper')}>
      <div className={cx('product__img-container')}>
        <img className={cx('product__img')} src={data?.image} alt={data?.name} />
      </div>

      <div className={cx('product__info')}>
        <div className={cx('product__name')}>{data?.name}</div>
        <div className={cx('product__desc')}>{data?.description}</div>
        <div className={cx('product__last-row')}>
          <div className={cx('product__price')}>{data?.price}</div>
          <div className={cx('product__add-cart-btn')}></div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
