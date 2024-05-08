import { useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import style from './HistoryOder.module.scss';

import HistoryOderItem from '../HistoryOderItem';
import images from '~/assets/images';

const cx = classNames.bind(style);

function HistoryOder() {
  const { t } = useTranslation();

  const statusList = [
    t('historyOrder.status01'),
    t('historyOrder.status02'),
    t('historyOrder.status03'),
    t('historyOrder.status04'),
    t('historyOrder.status05'),
    t('historyOrder.status06'),
  ];

  const isEmptyOrder = true;
  const [statusSelected, setStatusSelected] = useState(statusList[0]);

  return (
    <div className="History-order-wrapper">
      <div className={cx('order-status__nav')}>
        {statusList.map((item, index) => {
          return (
            <div
              className={cx('order-status__item', { 'order-status__item--active': statusSelected === item })}
              key={index}
              onClick={() => {
                setStatusSelected(item);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div className={cx('list-item')}>
        {(!isEmptyOrder || statusSelected !== t('historyOrder.status06')) && (
          <>
            <HistoryOderItem />
            <HistoryOderItem />
            <HistoryOderItem />
          </>
        )}
        {isEmptyOrder && statusSelected === t('historyOrder.status06') && (
          <div className={cx('empty-order')}>
            <img src={images.emptyOrder} className={cx('empty-order__img')} alt="Empty order" />
            <p className={cx('empty-order__desc')}>{t('historyOrder.desc01')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryOder;
