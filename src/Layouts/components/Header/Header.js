import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import styles from './Header.module.scss';

import { useBasket } from '~/contexts/BasketContext';
import routes from '~/config/routes';
import images from '~/assets/images';
import Button from '~/components/Button';
import {
  ArrowDownIcon,
  CartIcon,
  ClockIcon,
  CloseIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from '~/components/Icons';
import CartItem from '~/components/CartItem';
import { useSelector } from 'react-redux';
import { getLocalStorageItem } from '~/utils/localStorage';
const cx = classNames.bind(styles);

function Header() {
  const { t } = useTranslation();
  const location = useLocation();

  let userInfo = getLocalStorageItem('user');
  // console.log(userInfo);
  const { cartItems, clearCart } = useBasket();

  const [logo, setLogo] = useState(images.logoVip1);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(cartItems.totalPrice);
  const [displayQuantity, setDisplayQuantity] = useState(cartItems.quantity);
  const isProduct = cartItems.items.length > 0 ? true : false;
  const isCarts = cartItems.items.length > 0 ? true : false;
  const [isLogin, setIsLogin] = useState(false);
  const [avatar, setAvatar] = useState(userInfo?.avatar ? userInfo.avatar : images.avatarDefault);

  const headerRef = useRef(null);
  const languagesRef = useRef(null);
  const languageBtnRef = useRef(null);
  const userOptionsRef = useRef(null);
  const avatarRef = useRef(null);
  const cartRef = useRef(null);

  const auth = useSelector((state) => state.auth.isLogin);
  const userData = useSelector((state) => state.auth);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (userData.isUpdate) {
      console.log(userData.user);
      setAvatar(userData.user?.avatar ? userData.user.avatar : images.avatarDefault);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.user]);

  useEffect(() => {
    if (auth || token) {
      setIsLogin(true);
      setAvatar(userInfo?.avatar ? userInfo.avatar : images.avatarDefault);
    } else {
      setIsLogin(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, token]);

  const handleClickOutsideLanguages = useCallback((event) => {
    if (
      languagesRef.current &&
      !languagesRef.current.contains(event.target) &&
      !languageBtnRef.current.contains(event.target)
    ) {
      setShowLanguages(false);
    }
  }, []);

  const handleClickOutsideUserOptions = useCallback((event) => {
    if (
      userOptionsRef.current &&
      !userOptionsRef.current.contains(event.target) &&
      !avatarRef.current.contains(event.target)
    ) {
      setShowUserOptions(false);
    }
  }, []);

  const handleWheel = (e) => {
    if (cartRef.current) {
      cartRef.current.scrollTop += e.deltaY * 0.4;
    }
  };

  const handleCloseCart = () => {
    if (showCart) {
      setShowCart(false);
    }
    if (showMenu) {
      setShowMenu(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setShowUserOptions(false);
    // Lưu trạng thái thông báo vào localStorage
    localStorage.setItem('showToast', 'true');
    window.location.href = '/';
  };

  // kiểm tra trạng thái thông báo khi trang web tải lại
  useEffect(() => {
    const showToast = localStorage.getItem('showToast');
    if (showToast === 'true') {
      toast.success(t('login.notify02'));
      // Xóa trạng thái thông báo sau khi đã hiển thị
      const deleteToast = setTimeout(() => {
        localStorage.removeItem('showToast');
      }, 100);
      // Xóa timeout sau khi nó đã thực hiện xong
      return () => clearTimeout(deleteToast);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 768) {
        if (window.scrollY > 0) {
          headerRef.current.style.backgroundColor = '#fff';
          headerRef.current.style.boxShadow = '0 1px 1px rgba(0, 0, 0, 0.12)';

          setLogo(images.logoVip2);
        } else {
          headerRef.current.style.boxShadow = '0 1px 1px transparent';
          if (location.pathname !== '/') {
            setLogo(images.logoVip2);
            headerRef.current.style.backgroundColor = '#fff';
          } else {
            setLogo(images.logoVip1);
            headerRef.current.style.backgroundColor = 'transparent';
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [location]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setLogo(images.logoVip2);
    } else {
      setLogo(images.logoVip1);
    }
  }, [location]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideLanguages);

    return () => {
      document.removeEventListener('click', handleClickOutsideLanguages);
    };
  }, [handleClickOutsideLanguages]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideUserOptions);

    return () => {
      document.removeEventListener('click', handleClickOutsideUserOptions);
    };
  }, [handleClickOutsideUserOptions]);

  useEffect(() => {
    const disableScroll = (event) => {
      event.preventDefault();
    };

    if (showCart) {
      window.addEventListener('wheel', disableScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', disableScroll);
    }

    return () => {
      window.removeEventListener('wheel', disableScroll);
    };
  }, [showCart]);

  useEffect(() => {
    setDisplayPrice(cartItems.totalPrice);
    setDisplayQuantity(cartItems.quantity);
  }, [cartItems.totalPrice, cartItems.quantity]);

  return (
    <div ref={headerRef} className={cx('wrapper')}>
      <div className={cx('container gx-5')}>
        <div className={cx('header')}>
          {/* Mobile Menu */}
          <button onClick={() => setShowMenu(!showMenu)} className={cx('header__menu')}>
            <MenuIcon />
          </button>
          <ul className={cx('header__menu-options', showMenu ? 'header__menu-options--show' : '')}>
            <Link
              to={routes.home}
              onClick={() => {
                setShowCart(false);
                setShowMenu(false);
              }}
              className={cx('header__menu-option')}
            >
              <HomeIcon className={cx('icon')} />
              {t('header.na01')}
            </Link>
            <Link
              to={routes.checkout}
              onClick={() => {
                setShowCart(false);
                setShowMenu(false);
              }}
              className={cx('header__menu-option')}
            >
              <CartIcon className={cx('icon')} />
              {t('cart.title03')}
            </Link>
            <li className={cx('header__menu-bottom')}></li>
          </ul>

          {/* Logo */}
          <Link
            to={routes.home}
            onClick={(e) => {
              location.pathname === '/' && e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src={logo} alt="logo" className={cx('header__logo')} />
          </Link>

          {/* Actions */}
          <nav className={cx('header__actions')}>
            <div onClick={() => setShowCart(!showCart)} className={cx('header__actions-group', 'header__actions-cart')}>
              <Button
                haveProducts={isCarts && (auth || token)}
                action
                outline
                leftIcon={<CartIcon className={cx('icon')} />}
              >
                {displayPrice !== 0 && (auth || token) ? `${displayPrice.toLocaleString('vi-VN')} ₫` : ''}
              </Button>
              {isCarts && (auth || token) && <span className={cx('header__actions-quantity')}>{displayQuantity}</span>}
            </div>
            {!isLogin && (
              <div className={cx('header__actions-group')}>
                <Link to={routes.login}>
                  <Button action outline>
                    {t('header.na02')}
                  </Button>
                </Link>
              </div>
            )}
            {isLogin && (
              <div className={cx('header__actions-group')}>
                <img
                  ref={avatarRef}
                  onClick={() => setShowUserOptions(!showUserOptions)}
                  className={cx('header__actions-avatar', showUserOptions && 'header__actions-avatar--open')}
                  src={avatar}
                  alt="avatar"
                />
                <ul
                  ref={userOptionsRef}
                  className={cx('header__user-options', showUserOptions ? 'header__user-options--show' : '')}
                >
                  <Link to={'/auth/profile'} onClick={() => setShowUserOptions(false)}>
                    <li className={cx('header__user-option')}>
                      <p>{t('user-options.op01')}</p>
                      <UserIcon className={cx('icon')} />
                    </li>
                  </Link>
                  <li onClick={handleLogOut} className={cx('header__user-option')}>
                    <p>{t('user-options.op02')}</p>
                    <LogOutIcon className={cx('icon')} />
                  </li>
                </ul>
              </div>
            )}
            <div
              className={cx('header__actions-group')}
              ref={languageBtnRef}
              onClick={() => setShowLanguages(!showLanguages)}
            >
              <Button
                action
                outline
                rightIcon={
                  <ArrowDownIcon
                    className={cx('header__language-arrow', showLanguages && 'header__language-arrow--open', 'icon')}
                  />
                }
              >
                {Cookies.get('lang').toUpperCase()}
              </Button>
            </div>

            {/* Language options */}
            <ul ref={languagesRef} className={cx('header__languages', showLanguages ? 'header__languages--show' : '')}>
              <li
                onClick={() => {
                  Cookies.set('lang', 'vi');
                  setShowLanguages(false);

                  window.location.reload();
                }}
                className={cx('header__language')}
              >
                <p>Tiếng Việt</p>
                <img loading="lazy" className={cx('header__language-img')} src={images.vi} alt="vi" />
              </li>
              <li
                onClick={() => {
                  Cookies.set('lang', 'en');
                  setShowLanguages(false);

                  window.location.reload();
                }}
                className={cx('header__language')}
              >
                <p>English</p>
                <img loading="lazy" className={cx('header__language-img')} src={images.en} alt="en" />
              </li>
              <li
                onClick={() => {
                  Cookies.set('lang', 'zh');
                  setShowLanguages(false);

                  window.location.reload();
                }}
                className={cx('header__language')}
              >
                <p>中国人</p>
                <img loading="lazy" className={cx('header__language-img')} src={images.zh} alt="zh" />
              </li>
            </ul>
          </nav>
        </div>

        {/* Cart */}
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
            {!isProduct && (auth || token) && (
              <div className={cx('cart__empty')}>
                <img className={cx('cart__empty-img')} src={images.cart} alt="cart" />
                <h5 className={cx('cart__empty-title')}>{t('cart.title02')}</h5>
                <p className={cx('cart__empty-desc')}>{t('cart.desc02')}</p>
                <button onClick={handleCloseCart} className={cx('cart__empty-btn')}>
                  {t('button.btn02')}
                </button>
              </div>
            )}

            {isProduct && (auth || token) && (
              <div ref={cartRef} onWheel={handleWheel} className={cx('cart__scroll')}>
                <div className={cx('cart__content')}>
                  <div className={cx('cart__products')}>
                    <div className={cx('cart__products-top')}>
                      <Link to={'#!'}>
                        <h5 className={cx('cart__products-heading')}>HaUI Food</h5>
                      </Link>
                      <button onClick={() => clearCart()} className={cx('cart__products-delete-all')}>
                        {t('button.btn04')}
                      </button>
                    </div>
                    <div className={cx('cart__products-list')}>
                      {cartItems.items.map((cartItem) => (
                        <CartItem key={cartItem.id} data={cartItem} />
                      ))}
                    </div>
                  </div>
                  <div className={cx('cart__summary')}>
                    <div className={cx('cart__summary-info')}>
                      <span className={cx('cart__summary-price')}>{t('cart.desc03')}</span>
                      <span className={cx('cart__summary-price')}>
                        {cartItems.totalPrice.toLocaleString('vi-VN')} ₫
                      </span>
                    </div>
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
                <span className={cx('cart__bottom-price')}>{cartItems.totalPrice.toLocaleString('vi-VN')} ₫</span>
              </div>
              <Link to={routes.checkout}>
                <Button checkout primary>
                  {t('button.btn01')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Overlay */}
      {(showCart || showMenu) && (
        <div onClick={handleCloseCart} className={cx('overlay', showMenu || showCart ? 'overlay--show' : '')}></div>
      )}
    </div>
  );
}

export default Header;
