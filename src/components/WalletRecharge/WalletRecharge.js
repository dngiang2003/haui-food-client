import classNames from 'classnames/bind';
import styles from './WalletRecharge.module.scss';
import images from '~/assets/images';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { CopyIcon } from '../Icons';
import { io } from 'socket.io-client';
import formatCurrency from '~/utils/formatCurrency';
import hostname from '~/utils/http';

const cx = classNames.bind(styles);

function WalletRecharge({ userInfo }) {
  const { t } = useTranslation();
  const socket = io(hostname, {
    query: { userId: userInfo?._id },
  });

  socket.on('rechargeSuccess', (data) => {
    toast.success(t('topUp.desc06') + formatCurrency(data.amount) + ' VND');
  });

  return (
    <div className={cx('wallet')}>
      <h2 className={cx('wallet__title')}>{t('topUp.title01')}</h2>
      <div title="Copy" className={cx('wallet__transfer-content-container')}>
        <div
          className={cx('wallet__transfer-content-value')}
          onClick={(e) => {
            const text = e.target.innerText;
            navigator.clipboard.writeText(text);
            toast.success(t('authTwinSetup.toast.copySuccess'));
          }}
        >
          {userInfo?.username} <CopyIcon className={cx('wallet__copy-icon')} />
        </div>
      </div>

      <div className={cx('wallet__logo-bank-container')}>
        <img src={images.logoTpBank} alt="HaUIFood TPbank" />
      </div>

      <div className={cx('wallet__qr-wrapper')}>
        <div className={cx('wallet__qr-info')}>
          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>{t('topUp.title02')}</div>
            <div className={cx('wallet__qr-info-value')}>00005572823</div>
          </div>

          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>{t('topUp.title03')}</div>
            <div className={cx('wallet__qr-info-value', 'wallet__qr-info-value--green')}>DO NGOC GIANG</div>
          </div>

          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>{t('topUp.title04')}</div>
            <div className={cx('wallet__qr-info-value')}>1 VNĐ = 1 HaUIFood coin</div>
          </div>

          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>{t('topUp.title05')}</div>
            <div className={cx('wallet__qr-info-value')}>10.000 VNĐ</div>
          </div>

          <div className={cx('wallet__qr-container')}>
            <img
              src={`https://img.vietqr.io/image/970423-00005572823-compact.jpg?addInfo=${userInfo?.username}`}
              alt="hauiFood"
            />
          </div>
        </div>
      </div>

      <div className={cx('wallet__note-container')}>
        <div className={cx('wallet__note-label')}>{t('topUp.title06')}</div>
        <p className={cx('wallet__note-desc')}>
          <div>-</div>
          {t('topUp.desc01')}
        </p>
        <div className={cx('wallet__note-desc')}>
          <div> -</div> <p>{t('topUp.desc02')}</p>
        </div>
        <div className={cx('wallet__note-desc')}>
          <div> -</div>{' '}
          <p>
            {t('topUp.desc03')}{' '}
            <a href="https://www.facebook.com/messages/t/274451679080721" target="blank">
              {t('topUp.desc04')}
            </a>{' '}
            {t('topUp.desc05')}
          </p>
        </div>
      </div>
    </div>
  );
}
export default WalletRecharge;
