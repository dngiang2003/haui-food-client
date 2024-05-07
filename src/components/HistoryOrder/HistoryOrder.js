import classNames from 'classnames/bind';
import style from './HistoryOder.module.scss';
import { useState } from 'react';
import HistoryOderItem from '../HistoryOderItem';

const cx = classNames.bind(style);
const statusList = ['Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Hoàn thành', 'Đã hủy'];
function HistoryOder() {
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
        <HistoryOderItem />
        <HistoryOderItem />
        <HistoryOderItem />
      </div>
    </div>
  );
}

export default HistoryOder;
