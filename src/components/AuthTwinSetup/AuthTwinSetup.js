import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import style from './AuthTwinSetup.module.scss';

import images from '~/assets/images';
import Button from '../Button';
import { CheckIcon, PowerOffIcon, RefreshIcon } from '../Icons';
import { getSecretKey, toggle2FA, updateSecretKey } from '~/apiService/authService';
import { getLocalStorageItem, addOrUpdateFieldInLocalStorage } from '~/utils/localStorage';
import { generateQRCodeImage } from '~/utils/qrCode';

const cx = classNames.bind(style);

function AuthTwinSetup() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reduxData = useSelector((state) => state.auth);
  const userInfo = getLocalStorageItem('user');

  const [isUseAuthTwin, setIsUseAuthTwin] = useState();
  const [secretKey, SetSecretKey] = useState();
  const [otpValue, setOtpValue] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [qrImg, setQrImg] = useState('');
  const [isRefresh, setIsRefresh] = useState(false);
  const [tempSecretKey, setTempSecretKey] = useState();

  const addSpaceForSecretKey = (secretKey) => {
    let newSecretKey = '';
    if (!secretKey) {
      return;
    }
    for (let i = 0; i < secretKey.length; i += 4) {
      newSecretKey += secretKey.slice(i, i + 4) + ' ';
    }
    return newSecretKey.trim();
  };

  // handle refresh secret key
  const handleRefreshSecretKey = () => {
    if (isRefresh === false) {
      setIsRefresh(true);
    }

    dispatch(getSecretKey()).then((result) => {
      if (result.payload.code === 200) {
        setTempSecretKey(result.payload.data.secret);
        SetSecretKey(result.payload.data.secret);
        setQrImg(generateQRCodeImage(userInfo.email, reduxData.secretKey));
        toast.success(result.payload.message);
      } else {
        toast.error(result.payload.message);
      }
    });
  };

  const handleToggle2FA = () => {
    if (!isUseAuthTwin && !isUpdate) {
      toast.error(t('authTwinSetup.toast.invalidOtp'));
      return;
    }

    dispatch(toggle2FA(isUseAuthTwin ? {} : { code: otpValue })).then((result) => {
      if (result.payload.code === 200) {
        toast.success(result.payload.message);
        setIsUseAuthTwin(!isUseAuthTwin);
        setOtpValue('');
        addOrUpdateFieldInLocalStorage('user', 'is2FA', result.payload.data.is2FA);
      } else {
        setOtpValue('');
        toast.error(result.payload.message);
      }
    });
    setIsUpdate(false);
  };

  const handleUpdateSecretKey = () => {
    if (isUpdate) {
      dispatch(updateSecretKey({ code: otpValue, secret: tempSecretKey })).then((result) => {
        if (result.payload.code === 200) {
          toast.success(result.payload.message);
          addOrUpdateFieldInLocalStorage('user', 'secret', result.payload.data.secret);
          setIsUpdate(false);
          setIsRefresh(false);
        } else {
          toast.error(result.payload.message);
        }
      });
    } else {
      toast.error(t('authTwinSetup.toast.invalidOtp'));
    }
    setOtpValue('');
  };

  const validateOtpInput = (event) => {
    const value = event.target.value;

    if (/^\d*$/.test(value) && value.length < 7) {
      setOtpValue(value);
      setIsUpdate(false);
    }
    if (value.length === 6) {
      setIsUpdate(true);
    }
  };

  useEffect(() => {
    const secretKey = userInfo?.secret ? userInfo.secret : '';
    setQrImg(generateQRCodeImage(userInfo.email, secretKey));
    SetSecretKey(secretKey);
    setIsUseAuthTwin(userInfo.is2FA);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('auth-twin-wrapper')}>
      <h2 className={cx('auth-twin__title')}>{t('authTwinSetup.title01')}</h2>
      <div className={cx('first-row')}>
        <p className={cx('first-row__desc')}>
          <span>
            <CheckIcon className={cx('check-icon')} />
          </span>
          {t('authTwinSetup.desc01')}
        </p>

        <p className={cx('first-row__desc')}>
          <span>
            <CheckIcon className={cx('check-icon')} />
          </span>
          {t('authTwinSetup.desc02')}
        </p>

        <div className={cx('first-row__desc')}>
          <span>
            <CheckIcon className={cx('check-icon')} />
          </span>
          <p>
            {t('authTwinSetup.desc03.1')}
            <a target="blank" href="https://apps.apple.com/us/app/google-authenticator/id388497605">
              <strong className={cx('strong')}> IOS </strong>
            </a>
            {t('authTwinSetup.desc03.2')}
            <a
              target="blank"
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US&pli=1"
            >
              <strong className={cx('strong')}> Android </strong>
            </a>
          </p>
        </div>
      </div>

      <div className={cx('security-method')}>
        {/* method security */}
        <div className={cx('security-method__title')}>{t('authTwinSetup.title02')}</div>
        <div className={cx('security-method__options')}>
          {!isUseAuthTwin && <div className={cx('security-method__option-label')}>{t('authTwinSetup.method01')}</div>}
          {isUseAuthTwin && <div className={cx('security-method__option-label')}>{t('authTwinSetup.method02')}</div>}
        </div>
      </div>

      <div className={cx('secret-key__container')}>
        <div className={cx('secret-key__first-row')}>
          <div className={cx('secret-key__content')}>
            <p className={cx('secret-key__desc')}>{t('authTwinSetup.desc04')}</p>

            <p className={cx('secret-key__label')}>Secret Key:</p>
            <div className={cx('secret-key__value-container')}>
              <span
                onDoubleClick={(e) => {
                  const text = e.target.innerText;
                  navigator.clipboard.writeText(text);
                  toast.info(t('authTwinSetup.toast.copySuccess'));
                }}
              >
                <div className={cx('secret-key__value')}>{addSpaceForSecretKey(secretKey)}</div>
              </span>
              <Button
                leftIcon={<RefreshIcon className={cx('refresh-icon')} />}
                className={cx('secret-key__refresh-btn')}
                disabled={reduxData.loading}
                onClick={() => {
                  handleRefreshSecretKey();
                }}
              >
                {t('authTwinSetup.refresh-btn')}
              </Button>
            </div>
          </div>
          <img
            className={cx('secret-key__qr-code')}
            src={qrImg}
            alt="QR Code"
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = images.avatarDefault;
            }} // Xử lý khi ảnh không thể tải được
          />
        </div>

        <div className={cx('otp__container')}>
          <div className={cx('otp__title')}>{t('authTwinSetup.title03')}</div>
          <div>
            <input
              className={cx('otp__input', { isDisabled: reduxData.loading })}
              placeholder="XXXXXX"
              value={otpValue}
              onChange={(e) => {
                validateOtpInput(e);
              }}
            />
          </div>
          <p className={cx('otp__note')}> {t('authTwinSetup.otpNote')}</p>
        </div>
        <div className={cx('otp__btns')}>
          <Button
            leftIcon={<PowerOffIcon className={cx('btn-power-icon')} />}
            className={cx('update-btn', { 'btn-power-off': isUseAuthTwin })}
            disabled={(isRefresh && !isUseAuthTwin) || reduxData.loading}
            onClick={() => {
              handleToggle2FA();
            }}
          >
            {isUseAuthTwin ? 'Tắt' : 'Bật'}
          </Button>

          <Button
            leftIcon={<CheckIcon className={cx('btn-check-icon')} />}
            className={cx('update-btn')}
            disabled={!isRefresh || reduxData.loading}
            onClick={() => {
              handleUpdateSecretKey();
            }}
          >
            {t('authTwinSetup.update-btn')}
          </Button>
        </div>

        <div className={cx('note__container')}>
          <div className={cx('note__title')}>{t('authTwinSetup.title04')}</div>
          <div className={cx('note__desc')}>
            1.{' '}
            <p>
              {t('authTwinSetup.note01')}
              <strong className={cx('strong')}> HauiFood</strong>
            </p>
          </div>
          <div className={cx('note__desc')}>
            2.
            <p> {t('authTwinSetup.note02')}</p>
          </div>
          <div className={cx('note__desc')}>
            3. <p>{t('authTwinSetup.note03')}</p>
          </div>
          <div className={cx('note__desc')}>
            4. <p> {t('authTwinSetup.note04')}</p>
          </div>
          <p className={cx('note__desc')}>
            {t('authTwinSetup.note05.1')}
            <a target="blank" href="https://apps.apple.com/us/app/google-authenticator/id388497605">
              <strong className={cx('strong')}>IOS</strong>
            </a>
            {t('authTwinSetup.note05.2')}
            <a
              target="blank"
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US&pli=1"
            >
              <strong className={cx('strong')}>Android</strong>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default AuthTwinSetup;
