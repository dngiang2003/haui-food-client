import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Checkbox, FormControlLabel, createTheme, ThemeProvider } from '@mui/material';
import { useLocation } from 'react-router-dom';

import styles from './CartItem.module.scss';

import Button from '../Button';
import { CloseIcon, MinusIcon, PlusIcon } from '../Icons';
import { addProductToCart, removeProductToCart } from '~/apiService/cartService';

const cx = classNames.bind(styles);

const theme = createTheme({
  typography: {
    fontSize: 20,
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#c5c5c5',
          '&.Mui-checked': {
            color: 'var(--primary-color)',
          },
          '&.MuiCheckbox-indeterminate': {
            color: 'var(--primary-color)',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginRight: '0',
        },
      },
    },
  },
});

function CartItem({ data, isCheckout = false, showCart, shopChecked, onItemCheckboxChange, checkedItems, idShop }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isNotUpdate, setIsNotUpdate] = useState(false);

  const [openChange, setOpenChange] = useState(false);
  const [changeQuantity, setChangeQuantity] = useState(data.quantity);
  const [changeTotalPrice, setChangeTotalPrice] = useState(data.totalPrice);

  const [isChecked, setIsChecked] = useState(true);

  const productName = data.product.name;

  const temporaryIncreasedQuantity = () => {
    setChangeQuantity((preQuantity) => preQuantity + 1);
    setChangeTotalPrice((changeQuantity + 1) * data.product.price);
  };

  const temporaryReducedQuantity = () => {
    if (changeQuantity > 0) {
      setChangeQuantity((preQuantity) => preQuantity - 1);
      setChangeTotalPrice((changeQuantity - 1) * data.product.price);
    }
  };

  const handleUpdateQuantity = () => {
    if (changeQuantity > data.quantity) {
      dispatch(addProductToCart({ product: data.product._id, quantity: changeQuantity - data.quantity })).then(
        (result) => {
          if (result.payload.code === 200) {
            toast.success(result.payload.message);
          } else {
            toast.warning(result.payload.message);
          }
        },
      );
    } else {
      dispatch(removeProductToCart({ product: data.product._id, quantity: data.quantity - changeQuantity })).then(
        (result) => {
          if (result.payload.code === 200) {
            toast.success(result.payload.message);
          } else {
            toast.warning(result.payload.message);
          }
        },
      );
    }
  };

  const deleteProduct = (data) => {
    dispatch(removeProductToCart(data)).then((result) => {
      if (result.payload.code === 200) {
        toast.success(result.payload.message);
      } else {
        toast.warning(result.payload.message);
      }
    });
  };

  useEffect(() => {
    if (isNotUpdate) {
      setChangeQuantity(data.quantity);
      setIsNotUpdate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotUpdate]);

  useEffect(() => {
    if (!showCart) {
      setOpenChange(false);
    }
  }, [showCart]);

  useEffect(() => {
    setIsChecked(shopChecked);
  }, [shopChecked]);

  useEffect(() => {
    if (data && location.pathname !== '/checkout') {
      onItemCheckboxChange(data._id, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openChange) {
      setChangeQuantity(data.quantity);
    }
    setChangeTotalPrice(data.totalPrice);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openChange]);

  return (
    <div className={cx('product')}>
      {!isCheckout && (
        <ThemeProvider theme={theme}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked || (data._id && checkedItems[idShop] ? checkedItems[idShop][data._id] : true)}
                onChange={(e) => {
                  setIsChecked(e.target.checked);
                  onItemCheckboxChange(data._id, e.target.checked);
                }}
              />
            }
          />
        </ThemeProvider>
      )}
      <div className={cx('product__mobile-quantity')}>
        <button
          style={isCheckout ? { cursor: 'default' } : {}}
          onClick={() => {
            if (!isCheckout) {
              setOpenChange(!openChange);
            }
          }}
          className={cx('product__mobile-quantity-btn')}
        >
          {data.quantity} X
        </button>
      </div>

      <div className={cx('product__img-wrap')}>
        <img src={data.product.image} alt="" className={cx('product__thumb')} />
      </div>

      <div className={cx('product__detail')}>
        <p className={cx('product__detail-name')}>{productName}</p>

        <div className={cx('product__detail-group')}>
          <span className={cx('product__detail-price')}>{data.product.price.toLocaleString('vi-VN')} ₫</span>
          {!isCheckout && (
            <button
              onClick={() => deleteProduct({ product: data.product._id, quantity: changeQuantity })}
              className={cx('product__detail-delete')}
            >
              {t('button.btn19')}
            </button>
          )}
        </div>
      </div>

      <div className={cx('change-quantity', openChange ? 'change-quantity--show' : '')}>
        <button
          onClick={() => {
            setOpenChange(false);
            setIsNotUpdate(true);
          }}
          className={cx('change-quantity__close')}
        >
          <CloseIcon className={cx('change-quantity__icon')} />
        </button>
        <img src={data.product.image} className={cx('change-quantity__img')} alt="" />
        <div className={cx('change-quantity__first')}>
          <h1 className={cx('change-quantity__name')}>{productName}</h1>
          <p className={cx('change-quantity__desc')}>{productName}</p>
          <p className={cx('change-quantity__price')}>{changeTotalPrice.toLocaleString('vi-VN')} ₫</p>
        </div>
        <div className={cx('change-quantity__last')}>
          <h2 className={cx('change-quantity__title')}>{t('cart.title05')}</h2>
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
              {t('authTwinSetup.update-btn')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
