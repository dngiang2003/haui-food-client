import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import style from './NoResult.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(style);

function NoResult({ className, type = 'restaurant' }) {
  const { t } = useTranslation();

  return (
    <div className={cx('no-result', className)}>
      <div className={cx('no-result__container')}>
        <img className={cx('no-result__img')} src={images.chickenBowl} alt="No result" />
        <div className={cx('no-result__content')}>
          <h3 className={cx('no-result__title')}>
            {type === 'restaurant' ? t('no-result.title-restaurant') : t('no-result.title-product')}
          </h3>
          <p className={cx('no-result__desc')}>{t('no-result.desc')}</p>
        </div>
      </div>
    </div>
  );
}

export default NoResult;
