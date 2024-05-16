import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import style from './HistoryOder.module.scss';

import HistoryOderItem from '../HistoryOderItem';
import images from '~/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '~/apiService/orderSevice';
import { toast } from 'react-toastify';
import Skeleton from '../Skeleton';

const cx = classNames.bind(style);

function HistoryOder() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reduxData = useSelector((prop) => prop.order);
  const [orderData, setOrderData] = useState([]);

  const statusList = [
    {
      label: t('historyOrder.statusAll'),
      status: 'all',
    },
    {
      label: t('historyOrder.statusPending'),
      status: 'pending',
    },
    {
      label: t('historyOrder.statusConfirmed'),
      status: 'confirmed',
    },
    {
      label: t('historyOrder.statusShipping'),
      status: 'shipping',
    },
    {
      label: t('historyOrder.statusSuccess'),
      status: 'success',
    },
    {
      label: t('historyOrder.statusCanceled'),
      status: 'canceled',
    },
    {
      label: t('historyOrder.statusRejected'),
      status: 'reject',
    },
  ];

  const [statusSelected, setStatusSelected] = useState(statusList[0].label);
  useEffect(() => {
    dispatch(getOrder()).then((result) => {
      console.log(result);
      if (result.payload.code === 200) {
        setOrderData(result.payload.data);
      } else {
        toast.error(result.payload.message);
      }
    });
  }, []);

  // khi người dùng xóa đơn hàng sẽ dispatch id đơn hàng, lấy id đó để xóa đơn hàng trong mảng
  useEffect(() => {
    const newList = orderData?.orders?.filter((item) => item._id !== reduxData?.idOrderCancel);

    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      orders: newList,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxData.idOrderCancel]);

  const handleSelectStatus = (status) => {
    let params = {
      status: status,
    };

    if (status === 'all') {
      params = {};
    }
    dispatch(getOrder(params)).then((result) => {
      if (result.payload.code === 200) {
        setOrderData(result.payload.data);
      } else {
        toast.error(result.payload.message);
      }
    });
  };

  return (
    <div className="History-order-wrapper">
      <div className={cx('order-status__nav')}>
        {statusList.map((item, index) => {
          return (
            <div
              className={cx('order-status__item', { 'order-status__item--active': statusSelected === item.label })}
              key={index}
              onClick={() => {
                if (statusSelected === item.label) {
                  return;
                }
                setStatusSelected(item.label);
                handleSelectStatus(item.status);
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>

      {!reduxData.loading && (
        <div className={cx('list-item')}>
          {orderData?.orders?.map((order, index) => {
            return <HistoryOderItem key={index} data={order} />;
          })}
        </div>
      )}

      {reduxData.loading && (
        <div>
          <Skeleton listOrder={true} />
        </div>
      )}
      {orderData?.orders?.length === 0 && !reduxData.loading && (
        <div className={cx('empty-order')}>
          <img src={images.emptyOrder} className={cx('empty-order__img')} alt="Empty order" />
          <p className={cx('empty-order__desc')}>{t('historyOrder.desc01')}</p>
        </div>
      )}
    </div>
  );
}

export default HistoryOder;
