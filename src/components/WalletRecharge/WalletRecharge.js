import classNames from 'classnames/bind';
import styles from './WalletRecharge.module.scss';
import images from '~/assets/images';
import { CopyIcon } from '../Icons';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);

function WalletRecharge({ userInfo }) {
  const { t } = useTranslation();
  console.log(userInfo);

  return (
    <div className={cx('wallet')}>
      <h2 className={cx('wallet__title')}>Nội dung chuyển khoản</h2>
      <div title="Copy" className={cx('wallet__transfer-content-container')}>
        <div
          className={cx('wallet__transfer-content-value')}
          onDoubleClick={(e) => {
            const text = e.target.innerText;
            navigator.clipboard.writeText(text);
            toast.info(t('authTwinSetup.toast.copySuccess'));
          }}
        >
          {userInfo?.username} <CopyIcon className={cx('wallet__copy-icon')} />
        </div>
      </div>

      <div className={cx('wallet__logo-bank-container')}>
        <img src={images.logoTpBank} alt="hauiFood TPbank" />
      </div>

      <div className={cx('wallet__qr-wrapper')}>
        <div className={cx('wallet__qr-info')}>
          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>Số tài khoản:</div>
            <div className={cx('wallet__qr-info-value')}>00005572823</div>
          </div>

          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>Chủ tài khoản:</div>
            <div className={cx('wallet__qr-info-value', 'wallet__qr-info-value--green')}>DO NGOC GIANG</div>
          </div>

          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>Tỉ giá:</div>
            <div className={cx('wallet__qr-info-value')}>1 VNĐ = 1 hauifood coin</div>
          </div>

          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>Nạp tối thiểu:</div>
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
        <div className={cx('wallet__note-label')}>Lưu ý:</div>
        <p className={cx('wallet__note-desc')}>
          <div>-</div> Cố tình nạp dưới mức nạp không hỗ trợ.
        </p>
        <div className={cx('wallet__note-desc')}>
          <div> -</div>{' '}
          <p>
            Nạp sai cú pháp, sai số tài khoản, sai ngân hàng sẽ bị trừ 20% phí giao dịch. VD: nạp 100k sai nội dung sẽ
            chỉ nhận được 80K hauifood coin và phải liên hệ admin để cộng tay.
          </p>
        </div>
        <div className={cx('wallet__note-desc')}>
          <div> -</div>{' '}
          <p>
            Sau 5-10 phút tài khoản chưa được cộng coin hãy liên hệ admin tại{' '}
            <a href="https://www.facebook.com/profile.php?id=61557360312825" target="blank">
              đây
            </a>{' '}
            để được hỗ trợ.
          </p>
        </div>
      </div>
    </div>
  );
}
export default WalletRecharge;
