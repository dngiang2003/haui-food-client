import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import styles from './ServerError.module.scss';

import routes from '~/config/routes';
import images from '~/assets/images';
import { statistical } from '~/apiService/statisticalService';

const cx = classNames.bind(styles);

function ServerError() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(statistical())
      .then((result) => {
        if (result.payload.code !== 200) {
          toast.error(result.payload.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('bg-purple')}>
      <div className={cx('stars')}>
        <div className={cx('central-body')}>
          <img loading="lazy" className={cx('image-500')} src={images.internalServer} alt="500" />
          <Link to={routes.home} className={cx('btn-go-home')}>
            {t('button.btn13')}
          </Link>
        </div>
        <div className={cx('objects')}>
          <img loading="lazy" className={cx('object_rocket')} src={images.rocket} alt="rocket" width="40px" />
          <div className={cx('earth-moon')}>
            <img loading="lazy" className={cx('object_earth')} src={images.earth} alt="earth" width="100px" />
            <img loading="lazy" className={cx('object_moon')} src={images.moon} alt="moon" width="80px" />
          </div>
        </div>
        <div className={cx('glowing_stars')}>
          <div className={cx('star')}></div>
          <div className={cx('star')}></div>
          <div className={cx('star')}></div>
          <div className={cx('star')}></div>
          <div className={cx('star')}></div>
        </div>
      </div>
    </div>
  );
}

export default ServerError;
