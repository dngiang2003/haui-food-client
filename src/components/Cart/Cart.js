import { useRef } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styles from './Cart.module.scss';
import { ClockIcon, CloseIcon } from '~/components/Icons';
import images from '~/assets/images';
import routes from '~/config/routes';
import CartItem from '~/components/CartItem';
import Button from '~/components/Button';
import { Oval } from '@agney/react-loading';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Cart({ showCart, handleCloseCart, data }) {
  const { t } = useTranslation();
  const location = useLocation();

  const loading = useSelector((state) => state.cart.loading);
  const isProduct = data.carts && data.carts.length > 0 ? true : false;
  const auth = useSelector((state) => state.auth.isLogin);
  const token = localStorage.getItem('accessToken');

  const cartRef = useRef(null);

  const handleWheel = (e) => {
    if (cartRef.current) {
      cartRef.current.scrollTop += e.deltaY * 0.4;
    }
  };

  return (
    <div className={cx('cart', showCart ? 'cart--show' : '')}>
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
      <div className={cx('cart__container', !isProduct || !auth || !token ? 'cart__container--center' : '')}>
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
                console.log(data);
                return (
                  <div key={index} className={cx('cart__products')}>
                    <div className={cx('cart__products-top')}>
                      <Link to={'#!'}>
                        <h5 className={cx('cart__products-heading')}>{cartItem.shop.fullname}</h5>
                      </Link>
                      <button
                        onClick={() => toast.info('Tính năng đang được phát triển')}
                        className={cx('cart__products-delete-all')}
                      >
                        {t('button.btn04')}
                      </button>
                    </div>
                    <div className={cx('cart__products-list')}>
                      {cartItem.cartDetails.map((cartDetail, index) => (
                        <CartItem key={index} data={cartDetail} showCart={showCart} />
                      ))}
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
            <span className={cx('cart__bottom-price')}>{data.totalMoneyAllCarts.toLocaleString('vi-VN')} ₫</span>
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
