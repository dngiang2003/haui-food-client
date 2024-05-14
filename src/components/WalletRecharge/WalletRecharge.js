import classNames from 'classnames/bind';
import styles from './WalletRecharge.module.scss';
import images from '~/assets/images';
import { CopyIcon } from '../Icons';

const cx = classNames.bind(styles);

function WalletRecharge() {
  return (
    <div className={cx('wallet')}>
      <h2 className={cx('wallet__title')}>Nội dung chuyển khoản</h2>
      <div title="Copy" className={cx('wallet__transfer-content-container')}>
        <div className={cx('wallet__transfer-content-value')}>
          Le nghia <CopyIcon className={cx('wallet__copy-icon')} />
        </div>
      </div>

      <div className={cx('wallet__logo-bank-container')}>
        <img src={images.logoTpBank} alt="hauiFood TPbank" />
      </div>

      <div className={cx('wallet__qr-wrapper')}>
        <div className={cx('wallet__qr-info')}>
          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>Số tài khoản:</div>
            <div className={cx('wallet__qr-info-value')}>0966859061</div>
          </div>

          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>Chủ tài khoản:</div>
            <div className={cx('wallet__qr-info-value')}>Lê Công Nghĩa</div>
          </div>

          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>Tỉ giá:</div>
            <div className={cx('wallet__qr-info-value')}>1 VNĐ = 1 hauiFodd coin</div>
          </div>

          <div className={cx('wallet__qr-info-row')}>
            <div className={cx('wallet__qr-info-label')}>Nạp tối thiểu:</div>
            <div className={cx('wallet__qr-info-value')}>10.000 VNĐ</div>
          </div>

          <div className={cx('wallet__qr-container')}>
            <img
              src="https://img.vietqr.io/image/970423-00005572823-compact.jpg?addInfo=Test+transfer+6886"
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
        <p className={cx('wallet__note-desc')}>
          <div> -</div> Nạp sai cú pháp, sai số tài khoản, sai ngân hàng sẽ bị trừ 20% phí giao dịch. VD: nạp 100k sai
          nội dung sẽ chỉ nhận được 80K hauiFood coin và phải liên hệ admin để cộng tay.
        </p>
      </div>
    </div>
  );
}
export default WalletRecharge;
