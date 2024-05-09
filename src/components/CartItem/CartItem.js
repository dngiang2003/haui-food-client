import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import styles from './CartItem.module.scss';
import Button from '../Button';
import { CloseIcon, MinusIcon, PlusIcon } from '../Icons';
import { removeProductToCart } from '~/apiService/cartService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function CartItem({ data }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(data.quantity);
  const [openChange, setOpenChange] = useState(false);
  const [changeQuantity, setChangeQuantity] = useState(data.quantity);

  const [totalProductPrice, setTotalProductPrice] = useState(data.totalPrice);

  const handleIncreasedQuantities = () => {
    setQuantity((preQuantity) => {
      const newQuantity = preQuantity + 1;

      return newQuantity;
    });
  };

  const handleReducedQuantities = () => {
    if (quantity > 1) {
      setQuantity((preQuantity) => {
        const newQuantity = preQuantity - 1;
        return newQuantity;
      });
    }
  };

  const temporaryIncreasedQuantity = () => {
    setChangeQuantity((preQuantity) => preQuantity + 1);
  };

  const temporaryReducedQuantity = () => {
    if (changeQuantity > 1) {
      setChangeQuantity((preQuantity) => preQuantity - 1);
    }
  };

  const handleUpdateQuantity = () => {
    setQuantity(changeQuantity);
  };

  const deleteProduct = (data) => {
    dispatch(removeProductToCart(data)).then((result) => {
      console.log(result);
      if (result.payload.code === 200) {
        toast.success(result.payload.message);
      } else {
        toast.warning(result.payload.message);
      }
    });
  };

  useEffect(() => {
    setChangeQuantity(quantity);
  }, [quantity]);

  return (
    <div className={cx('product')}>
      <div className={cx('product__quantity')}>
        <button onClick={handleReducedQuantities} className={cx('product__quantity-btn')}>
          <MinusIcon />
        </button>
        <span className={cx('product__quantity-number')}>{quantity}</span>
        <button onClick={handleIncreasedQuantities} className={cx('product__quantity-btn')}>
          <PlusIcon />
        </button>
      </div>
      <div className={cx('product__mobile-quantity')}>
        <button onClick={() => setOpenChange(!openChange)} className={cx('product__mobile-quantity-btn')}>
          {quantity} X
        </button>
      </div>

      <div className={cx('product__img-wrap')}>
        <img src={data.product.image} alt="" className={cx('product__thumb')} />
      </div>

      <div className={cx('product__detail')}>
        <p className={cx('product__detail-name')}>{data.product.name}</p>

        <div className={cx('product__detail-group')}>
          <span className={cx('product__detail-price')}>{totalProductPrice.toLocaleString('vi-VN')} ₫</span>
          <button
            onClick={() => deleteProduct({ product: data.product._id, quantity: quantity })}
            className={cx('product__detail-delete')}
          >
            Xóa
          </button>
        </div>
      </div>

      <div className={cx('change-quantity', openChange ? 'change-quantity--show' : '')}>
        <button onClick={() => setOpenChange(false)} className={cx('change-quantity__close')}>
          <CloseIcon className={cx('change-quantity__icon')} />
        </button>
        <img src={data.product.image} className={cx('change-quantity__img')} alt="" />
        <div className={cx('change-quantity__first')}>
          <h1 className={cx('change-quantity__name')}>{data.name}</h1>
          <p className={cx('change-quantity__desc')}>{data.name}</p>
        </div>
        <div className={cx('change-quantity__last')}>
          <h2 className={cx('change-quantity__title')}>Thay đổi số lượng</h2>
          <div className={cx('change-quantity__btn-group')}>
            <button onClick={temporaryReducedQuantity} className={cx('change-quantity__quantity-btn')}>
              <MinusIcon />
            </button>
            <span className={cx('change-quantity__quantity-number')}>{changeQuantity}</span>
            <button onClick={temporaryIncreasedQuantity} className={cx('change-quantity__quantity-btn')}>
              <PlusIcon />
            </button>
          </div>
        </div>
        <div className={cx('change-quantity__footer')}>
          <div
            onClick={() => {
              handleUpdateQuantity();
              setOpenChange(false);
            }}
          >
            <Button checkout primary>
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
