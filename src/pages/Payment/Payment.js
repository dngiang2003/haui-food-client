import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import styles from './Payment.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Payment() {
  const { t } = useTranslation();

  const payment = useSelector((state) => state.payment.payment);
  const isPayment = Object.keys(payment).length === 0;

  const [countDown, setCountDown] = useState(15);

  useEffect(() => {
    const timer =
      countDown > 0 &&
      setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000 * 60);
    if (countDown === 0) {
      toast.info(t('payment.notify01'));
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown]);

  useEffect(() => {
    if (isPayment) {
      toast.warning(t('checkout.notify03'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPayment]);

  return (
    <div className={cx('payment')}>
      <div className={cx('payment__content')}>
        <h1 className={cx('payment__title')}>{t('payment.title01')}</h1>
        <img className={cx('payment__qr')} src={payment.qr || images.qrPay} alt="qr" />
        <p className={cx('payment__desc')}>
          {t('payment.desc01')} {(payment.total && `${payment.total.toLocaleString('vi-VN')} ₫`) || '0 ₫'}
        </p>
        <p className={cx('payment__desc')}>
          {t('payment.desc02')} {!isPayment ? <span className={cx('payment__times')}>{countDown}</span> : 15}{' '}
          {t('cart.desc05')}.
        </p>
      </div>
    </div>
  );
}

export default Payment;
