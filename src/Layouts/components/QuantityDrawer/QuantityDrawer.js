// QuantityDrawer.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeQuantityDrawer } from '~/features/productSlice'; // Import closeDrawer action from slice
import classNames from 'classnames/bind';
import style from './QuantityDrawer.module.scss';
import { CloseIcon, MinusIcon, PlusIcon } from '~/components/Icons';
import Button from '~/components/Button';
import formatCurrency from '~/utils/formatCurrency';

const cx = classNames.bind(style);

const QuantityDrawer = () => {
  const [quantity, setQuantity] = useState(1);

  const isOpen = useSelector((state) => state.product.isOpenQuantityDrawer);
  const data = useSelector((state) => state.product.updatingQuantityProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(1);
  }, [isOpen]);

  const handleCloseDrawer = () => {
    dispatch(closeQuantityDrawer());
  };

  const handleUpdateQuality = (type) => {
    if (type === 'minus') {
      if (quantity === 0) {
        return;
      } else {
        setQuantity(quantity - 1);
      }
    }

    if (type === 'plus') {
      setQuantity(quantity + 1);
    }
  };

  return (
    <>
      <div
        className={cx('quantity-drawer__overlay', { 'quantity-drawer__overlay--show': isOpen })}
        onClick={handleCloseDrawer}
      />

      <div className={cx('quantity-drawer__wrapper', { 'quantity-drawer__wrapper--show': isOpen })}>
        <div className={cx('quantity-drawer__header')}>
          <div className={cx('quantity-drawer__header-close')} onClick={handleCloseDrawer}>
            <span>
              <CloseIcon />
            </span>
          </div>

          <div className={cx('quantity-drawer__product-container')}>
            <img className={cx('quantity-drawer__product-img')} src={data?.image} alt={data?.name} />

            <div className={cx('quantity-drawer__product-info')}>
              <div className={cx('quantity-drawer__product-name')}>{data?.name}</div>
              <div className={cx('quantity-drawer__product-desc')}>{data?.description}</div>
            </div>

            <div className={cx('quantity-drawer__product-price')}>{formatCurrency(data?.price)}</div>
          </div>
        </div>

        <div className={cx('quantity-drawer__footer')}>
          <div className={cx('quantity-drawer__quantity-container')}>
            <div
              className={cx('quantity-drawer__quantity-minus')}
              onClick={() => {
                handleUpdateQuality('minus');
              }}
            >
              <MinusIcon />
            </div>

            <div className={cx('quantity-drawer__quantity-value')}>{quantity}</div>

            <div
              className={cx('quantity-drawer__quantity-plus')}
              onClick={() => {
                handleUpdateQuality('plus');
              }}
            >
              <PlusIcon />
            </div>
          </div>

          <Button
            primary
            className={cx('quantity-drawer__add-btn')}
            style={{
              backgroundColor: quantity === 0 ? '#ee6352' : '',
              border: quantity === 0 ? '1px solid #ee6352' : '',
            }}
            onClick={() => {
              if (quantity === 0) {
                handleCloseDrawer();
              }
            }}
          >
            {quantity > 0 ? `Thêm vào giỏ hàng ${formatCurrency(data?.price * quantity)}` : 'Huỷ'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuantityDrawer;
