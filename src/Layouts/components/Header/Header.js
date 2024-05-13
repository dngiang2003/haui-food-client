import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Oval } from '@agney/react-loading';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.scss';

import routes from '~/config/routes';
import images from '~/assets/images';
import Cart from '~/components/Cart';
import Button from '~/components/Button';
import { getLocalStorageItem } from '~/utils/localStorage';
import { displayProductInCart } from '~/apiService/cartService';
import { ArrowDownIcon, CartIcon, HomeIcon, LogOutIcon, MenuIcon, UserIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  let userInfo = getLocalStorageItem('user');

  const [cartsData, setCartsData] = useState({});
  const [logo, setLogo] = useState(images.logoVip1);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isCarts = cartsData.carts && cartsData.carts.length > 0 ? true : false;
  const [isLogin, setIsLogin] = useState(false);
  const [avatar, setAvatar] = useState(userInfo?.avatar ? userInfo.avatar : images.avatarDefault);

  const headerRef = useRef(null);
  const languagesRef = useRef(null);
  const languageBtnRef = useRef(null);
  const userOptionsRef = useRef(null);
  const avatarRef = useRef(null);

  const auth = useSelector((state) => state.auth.isLogin);
  const token = localStorage.getItem('accessToken');
  const userData = useSelector((state) => state.auth);
  const isLoadingCart = useSelector((state) => state.cart.loading);
  const isAddProduct = useSelector((state) => state.cart.isAddProduct);
  const isDeleteProduct = useSelector((state) => state.cart.isDeleteProduct);

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
    localStorage.removeItem('refreshToken');
    setShowUserOptions(false);

    // Lưu trạng thái thông báo vào localStorage
    localStorage.setItem('showToast', 'true');
    window.location.href = '/';
  };

  const displayCart = () => {
    dispatch(displayProductInCart()).then((result) => {
      if (result.payload.code === 200) {
        setCartsData(result.payload.data);
      }
      if (![200, 403].includes(result.payload.code)) {
        toast.warning(result.payload.message);
      }
    });
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
        if (window.scrollY > 50) {
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
      headerRef.current.style.backgroundColor = '#fff';
    } else {
      setLogo(images.logoVip1);
      headerRef.current.style.backgroundColor = 'transparent';
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

    if (showCart || isLoadingCart) {
      window.addEventListener('wheel', disableScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', disableScroll);
    }

    return () => {
      window.removeEventListener('wheel', disableScroll);
    };
  }, [showCart, isLoadingCart]);

  useEffect(() => {
    if (userData.isUpdate) {
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

  useEffect(() => {
    if (auth || token) {
      displayCart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddProduct, isDeleteProduct]);

  return (
    <div ref={headerRef} className={cx('wrapper')}>
      <div className={cx('container gx-5')}>
        <div className={cx('header')}>
          {/* Mobile Menu */}
          <button onClick={() => setShowMenu(!showMenu)} className={cx('header__menu')}>
            <MenuIcon />
          </button>
          <ul className={cx('header__menu-options', showMenu && 'header__menu-options--show')}>
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
            <li
              onClick={() => {
                setShowCart(!showCart);
                setShowMenu(false);
              }}
              className={cx('header__menu-option')}
            >
              <CartIcon className={cx('icon')} />
              {t('cart.title03')}
            </li>
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
            <img src={logo} alt='logo' className={cx('header__logo')} />
          </Link>

          {/* Actions */}
          <nav className={cx('header__actions')}>
            <div onClick={() => setShowCart(!showCart)} className={cx('header__actions-group', 'header__actions-cart')}>
              <Button haveProducts={isCarts && isLogin} action outline leftIcon={<CartIcon className={cx('icon')} />}>
                {cartsData.totalMoneyAllCarts !== 0 && isLogin
                  ? cartsData.totalMoneyAllCarts && `${cartsData.totalMoneyAllCarts.toLocaleString('vi-VN')} ₫`
                  : ''}
              </Button>
              {isCarts && isLogin && <span className={cx('header__actions-quantity')}>{cartsData.totalProducts}</span>}
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
                  alt='avatar'
                />
                <ul
                  ref={userOptionsRef}
                  className={cx('header__user-options', showUserOptions && 'header__user-options--show')}
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
            <ul ref={languagesRef} className={cx('header__languages', showLanguages && 'header__languages--show')}>
              <li
                onClick={() => {
                  Cookies.set('lang', 'vi');
                  setShowLanguages(false);

                  window.location.reload();
                }}
                className={cx('header__language')}
              >
                <p>Tiếng Việt</p>
                <img loading='lazy' className={cx('header__language-img')} src={images.vi} alt='vi' />
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
                <img loading='lazy' className={cx('header__language-img')} src={images.en} alt='en' />
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
                <img loading='lazy' className={cx('header__language-img')} src={images.zh} alt='zh' />
              </li>
            </ul>
          </nav>
        </div>

        {/* Cart */}
        <Cart showCart={showCart} handleCloseCart={handleCloseCart} data={cartsData} />
      </div>
      {/* Overlay */}
      {(showCart || showMenu) && (
        <div onClick={handleCloseCart} className={cx('overlay', (showMenu || showCart) && 'overlay--show')}></div>
      )}
      {isLoadingCart && !showCart && (
        <div className={cx('modal-loading')}>
          <div className={cx('modal-loading__content')}>
            <Oval width='50' color='#00b14f' />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
