import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './BreadCrumb.module.scss';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ChevronRight } from '../Icons';
import routes from '~/config/routes';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

function BreadCrumb({ className }) {
  const language = Cookies.get('lang');
  const categorySelected = sessionStorage.getItem('categorySelected')
    ? JSON.parse(sessionStorage.getItem('categorySelected'))
    : null;

  const restaurantSelected = sessionStorage.getItem('restaurantSelected')
    ? JSON.parse(sessionStorage.getItem('restaurantSelected'))
    : null;

  console.log(restaurantSelected);
  // console.log(categorySelected);
  let resString = 'restaurants';
  let cuisinesString = 'cuisines';
  if (language === 'vi') {
    cuisinesString = 'Ẩm thực';
    resString = 'Nhà hàng';
  }

  const pathname = useLocation()
    .pathname.split('/')
    .map((path) => {
      console.log(path);
      if (path === categorySelected?.slug ? categorySelected.slug : '') {
        return categorySelected.name;
      }
      if (path === restaurantSelected?.slug ? restaurantSelected.slug : '') {
        return restaurantSelected.name;
      }
      return path;
    });

  console.log(pathname);
  const upperFirstCase = (path) => {
    if (path === 'cuisines') {
      path = cuisinesString;
    }
    if (path === 'restaurants' || path === 'restaurant') {
      path = resString;
    }

    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className={cx('breadcrumb', className)}>
      {pathname.map((path, index) => (
        <div key={index} className={cx('breadcrumb__item-container')}>
          {index === pathname.length - 1 ? (
            <div className={cx('breadcrumb__item')}>{upperFirstCase(path)}</div>
          ) : (
            <Link
              className={cx('breadcrumb__item')}
              to={
                index === 0
                  ? '/'
                  : `/${
                      path === routes.category.split('/')[0] || path === routes.restaurant.split('/')[1]
                        ? `restaurants`
                        : path
                    }`
              }
            >
              {index === 0 ? (language === 'vi' ? 'Trang chủ' : 'Home') : upperFirstCase(path)}
            </Link>
          )}

          {index !== pathname.length - 1 && <ChevronRight className={cx('breadcrumb__icon')} />}
        </div>
      ))}
    </div>
  );
}

export default memo(BreadCrumb);
