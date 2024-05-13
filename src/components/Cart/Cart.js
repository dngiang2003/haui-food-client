import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from '@agney/react-loading';
import { toast } from 'react-toastify';
import { Checkbox, FormControlLabel, ThemeProvider, createTheme } from '@mui/material';
import { saveSelectedShops } from '~/features/checkoutCartsSlice';

import styles from './Cart.module.scss';

import { ClockIcon, CloseIcon } from '~/components/Icons';
import images from '~/assets/images';
import routes from '~/config/routes';
import CartItem from '~/components/CartItem';
import Button from '~/components/Button';

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

function Cart({ showCart, handleCloseCart, data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const loading = useSelector((state) => state.cart.loading);
  const isProduct = data.carts && data.carts.length > 0 ? true : false;
  const auth = useSelector((state) => state.auth.isLogin);
  const token = localStorage.getItem('accessToken');

  const [checkedShops, setCheckedShops] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [totalCartCheckout, setTotalCartCheckout] = useState(0);

  const cartRef = useRef(null);

  const handleWheel = (e) => {
    if (cartRef.current) {
      cartRef.current.scrollTop += e.deltaY * 0.4;
    }
  };

  // Hàm xử lý khi checkbox của sản phẩm được thay đổi trạng thái
  const handleItemCheckboxChange = (shopId, itemId, isChecked) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [shopId]: {
        ...prevState[shopId],
        [itemId]: isChecked,
      },
    }));
  };

  // Hàm xử lý khi checkbox của cửa hàng được thay đổi trạng thái
  const handleShopCheckboxChange = (shopId, isChecked) => {
    const shopItems = {};
    data.carts.forEach((cartItem) => {
      if (cartItem.shop._id === shopId) {
        cartItem.cartDetails.forEach((cartDetail) => {
          shopItems[cartDetail._id] = isChecked;
        });
      }
    });
    setCheckedItems((prevState) => ({
      ...prevState,
      [shopId]: shopItems,
    }));
  };

  useEffect(() => {
    if (data.carts) {
      // Kiểm tra xem tất cả các sản phẩm của mỗi cửa hàng đã được chọn chưa
      const shopsChecked = {};
      data.carts.forEach((cartItem) => {
        const shopId = cartItem.shop._id;
        const shopItems = checkedItems[shopId] || {};
        const shopItemsChecked = Object.values(shopItems).every((item) => item);
        shopsChecked[shopId] = shopItemsChecked;
      });
      setCheckedShops(shopsChecked);
    }
  }, [checkedItems, data.carts]);

  useEffect(() => {
    const selectedShops = [];
    let totalMoney = 0;
    let totalMoneyCarts = 0;
    if (data.carts) {
      data.carts.forEach((cartItem) => {
        const shopId = cartItem.shop._id;
        const selectedProducts = [];
        if (checkedItems[shopId]) {
          cartItem.cartDetails.forEach((cartDetail) => {
            if (checkedItems[shopId][cartDetail._id]) {
              selectedProducts.push(cartDetail);
              totalMoney += cartDetail.totalPrice; // Thêm giá tiền của sản phẩm đã chọn vào tổng tiền
              totalMoneyCarts += cartDetail.totalPrice;
            }
          });
          if (selectedProducts.length > 0) {
            selectedShops.push({
              shop: cartItem.shop,
              selectedProducts: selectedProducts,
              totalMoney: totalMoney, // Thêm tổng tiền vào đối tượng selectedShops
            });
          }
        }
        totalMoney = 0;
      });
    }
    setTotalCartCheckout(totalMoneyCarts);

    if (selectedShops.length > 0) {
      dispatch(saveSelectedShops(selectedShops));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems, data.carts]);

  return (
    <div className={cx('cart', showCart && 'cart--show')}>
      <div className={cx('cart__top')}>
        <button onClick={handleCloseCart} className={cx('cart__close')}>
          <CloseIcon />
        </button>
        {isProduct && (auth || token) && (
          <div className={cx('cart__top-block')}>
            <h5 className={cx('cart__top-title')}>{t('cart.title01')}</h5>
            <p className={cx('cart__top-desc')}>
              <ClockIcon className={cx('cart__top-clock')} />
              <span>
                {t('cart.desc01')} 15 {t('cart.desc05')}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className={cx('cart__container', (!isProduct || !auth || !token) && 'cart__container--center')}>
        {!auth && !token && (
          <div className={cx('cart__empty')}>
            <img className={cx('cart__empty-img')} src={images.cart} alt="cart" />
            <h5 className={cx('cart__empty-title')}>{t('cart.title04')}</h5>
            <p className={cx('cart__empty-desc')}>{t('cart.desc06')}</p>
            <Link to={routes.login}>
              <button className={cx('cart__empty-btn')}>{t('button.btn05')}</button>
            </Link>
          </div>
        )}
        {!isProduct && !loading && (auth || token) && (
          <div className={cx('cart__empty')}>
            <img className={cx('cart__empty-img')} src={images.cart} alt="cart" />
            <h5 className={cx('cart__empty-title')}>{t('cart.title02')}</h5>
            <p className={cx('cart__empty-desc')}>{t('cart.desc02')}</p>
            <button onClick={handleCloseCart} className={cx('cart__empty-btn')}>
              {t('button.btn02')}
            </button>
          </div>
        )}

        {loading && location.pathname !== '/checkout' && (
          <div className={cx('cart__empty', 'cart__loading')}>
            <Oval width="50" className={cx('cart__loading-icon')} />
          </div>
        )}

        {isProduct && (auth || token) && (
          <div ref={cartRef} onWheel={handleWheel} className={cx('cart__scroll')}>
            <div className={cx('cart__content')}>
              {data.carts.map((cartItem, index) => {
                return (
                  <div key={index} className={cx('cart__products')}>
                    <div className={cx('cart__products-top')}>
                      <div className={cx('cart__products-name')}>
                        <ThemeProvider theme={theme}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkedShops[cartItem.shop._id] || false}
                                onClick={(e) => handleShopCheckboxChange(cartItem.shop._id, e.target.checked)}
                              />
                            }
                          />
                        </ThemeProvider>
                        <Link to={`/restaurant/${cartItem.shop.slug}`} onClick={handleCloseCart}>
                          <h5 className={cx('cart__products-heading')}>{cartItem.shop.fullname}</h5>
                        </Link>
                      </div>
                      <button
                        onClick={() => toast.info('Tính năng đang được phát triển')}
                        className={cx('cart__products-delete-all')}
                      >
                        {t('button.btn04')}
                      </button>
                    </div>
                    <div className={cx('cart__products-list')}>
                      {cartItem.cartDetails.map((cartDetail, index) => {
                        return (
                          <CartItem
                            key={index}
                            data={cartDetail}
                            showCart={showCart}
                            shopChecked={checkedShops[cartItem.shop._id]}
                            onItemCheckboxChange={(itemId, isChecked) =>
                              handleItemCheckboxChange(cartItem.shop._id, itemId, isChecked)
                            }
                            checkedItems={checkedItems}
                            idShop={cartItem.shop._id}
                          />
                        );
                      })}
                    </div>
                    <div className={cx('cart__summary')}>
                      <div className={cx('cart__summary-info')}>
                        <span className={cx('cart__summary-price')}>{t('cart.desc03')}</span>
                        <span className={cx('cart__summary-price')}>
                          {cartItem.totalMoney.toLocaleString('vi-VN')} ₫
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className={cx('cart__summary')}>
                <p className={cx('cart__summary-desc')}>{t('cart.desc04')}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isProduct && (auth || token) && (
        <div className={cx('cart__bottom')}>
          <div className={cx('cart__bottom-info')}>
            <span className={cx('cart__bottom-price')}>{t('cart.desc03')}</span>
            <span className={cx('cart__bottom-price')}>{totalCartCheckout.toLocaleString('vi-VN')} ₫</span>
          </div>
          <Link to={routes.checkout}>
            <Button
              onClick={() => {
                if (location.pathname === '/checkout') {
                  handleCloseCart();
                }
              }}
              checkout
              primary
            >
              {t('button.btn01')}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
