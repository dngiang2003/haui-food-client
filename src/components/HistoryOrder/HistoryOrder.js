import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import style from './HistoryOder.module.scss';

import HistoryOderItem from '../HistoryOderItem';
import images from '~/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '~/apiService/orderSevice';
import { toast } from 'react-toastify';
import Skeleton from '../Skeleton';
import { type } from '@testing-library/user-event/dist/type';

const cx = classNames.bind(style);

function HistoryOder() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const limit = 8;

  const reduxData = useSelector((prop) => prop.order);
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHasMore, setIsHasMore] = useState(false);

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
  const [status, setStatus] = useState(statusList[0].status);

  // khi người dùng xóa đơn hàng sẽ dispatch id đơn hàng, lấy id đó để xóa đơn hàng trong mảng hiện có
  useEffect(() => {
    const newList = orderData.filter((item) => item._id !== reduxData?.idOrderCancel);
    setOrderData(newList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxData.idOrderCancel]);

  // call api lấy dữ liệu khi component được mount
  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrderData = () => {
    dispatch(getOrder({ limit, page: currentPage, status: status === 'all' ? '' : status })).then((result) => {
      if (result.payload.code === 200) {
        setOrderData((preOrderData) => {
          return [...preOrderData, ...result.payload.data.orders];
        });
        if (currentPage < result.payload.data.totalPage) {
          setCurrentPage(currentPage + 1);
          setIsHasMore(true);
        } else {
          setIsHasMore(false);
        }
      } else {
        toast.error(result.payload.message);
      }
    });
  };

  const handleSelectStatus = (status) => {
    setCurrentPage(1);
    setStatus(status);
    setOrderData([]);
    let params = {
      limit: limit,
      page: 1,
      status: status,
    };

    if (status === 'all') {
      params = { limit: limit, page: 1 };
    }

    dispatch(getOrder(params)).then((result) => {
      if (result.payload.code === 200) {
        setOrderData(result.payload.data.orders);
        if (currentPage < result.payload.data.totalPage) {
          setCurrentPage(2);
          setIsHasMore(true);
        } else {
          setIsHasMore(false);
        }
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

      <InfiniteScroll
        dataLength={orderData.length}
        // scrollThreshold={'100%'}
        hasMore={isHasMore}
        next={() => {
          fetchOrderData();
        }}
      >
        <div className={cx('list-item')}>
          {orderData &&
            !reduxData.cancelOrderLoading &&
            orderData?.map((order, index) => {
              return <HistoryOderItem key={index} data={order} />;
            })}
        </div>
      </InfiniteScroll>

      {(reduxData.loading || reduxData.cancelOrderLoading) && (
        <div>
          <Skeleton listOrder={true} />
        </div>
      )}
      {orderData.length === 0 && !reduxData.loading && (
        <div className={cx('empty-order')}>
          <img src={images.emptyOrder} className={cx('empty-order__img')} alt="Empty order" />
          <p className={cx('empty-order__desc')}>{t('historyOrder.desc01')}</p>
        </div>
      )}
    </div>
  );
}

export default HistoryOder;
