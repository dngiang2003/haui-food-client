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
  const nameCategory = localStorage.getItem('categorySelected')
    ? JSON.parse(localStorage.getItem('categorySelected'))
    : null;

  // console.log(nameCategory);
  let resString = 'restaurants';
  let cuisinesString = 'cuisines';
  if (language === 'vi') {
    cuisinesString = 'Ẩm thực';
    resString = 'Nhà hàng';
  }

  const pathname = useLocation()
    .pathname.split('/')
    .map((path) => {
      if (path === nameCategory?.slug ? nameCategory.slug : '') {
        return nameCategory.name;
      }
      return path;
    });

  // console.log(pathname);
  const upperFirstCase = (path) => {
    if (path === 'cuisines') {
      path = cuisinesString;
    }
    if (path === 'restaurants') {
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
              to={index === 0 ? '/' : `/${path === routes.category.split('/')[0] ? `restaurants` : path}`}
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
