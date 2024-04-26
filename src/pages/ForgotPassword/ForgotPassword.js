import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Oval } from '@agney/react-loading';

import styles from './ForgotPassword.module.scss';
import { EmailIcon, ReloadIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import routes from '~/config/routes';
import { captcha } from '~/apiService/captchaService';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function ForgotPassword() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.captcha.loading);

  const [email, setEmail] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');

  const [button, setButton] = useState(t('button.btn08'));
  const [submit, setSubmit] = useState(true);
  const [captchaSVG, setCaptchaSVG] = useState('');
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedCaptcha, setTouchedCaptcha] = useState(false);

  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);
  const [errors, setErrors] = useState({ email: '', captcha: false });

  const counter = useRef(Date.now());

  const SvgComponent = () => {
    const svgString = `${captchaSVG}`;
    const newWidth = '120';
    const newHeight = '100%';

    const updatedSvgString = svgString
      .replace(/width="[^"]*"/, `width="${newWidth}"`)
      .replace(/height="[^"]*"/, `height="${newHeight}"`);

    return <div dangerouslySetInnerHTML={{ __html: updatedSvgString }} />;
  };

  const fetchCaptcha = () => {
    dispatch(captcha())
      .then((result) => {
        if (result.payload.code === 201) {
          setCaptchaSVG(result.payload.data.image);
          sessionStorage.setItem('signature', result.payload.data.sign);
        } else {
          toast.error(result.payload.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
    counter.current = Date.now();
  };

  useEffect(() => {
    setSubmit(!emailRegex.test(email) || email === '' || captchaValue === '');
  }, [emailRegex, email, captchaValue]);

  useEffect(() => {
    if (touchedEmail) {
      if (!emailRegex.test(email)) {
        setErrors({ ...errors, email: t('errors.err02') });
      }
      if (email === '') {
        setErrors({ ...errors, email: t('errors.err01') });
      }
      if (emailRegex.test(email)) {
        setErrors({ ...errors, email: '' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, touchedEmail]);

  useEffect(() => {
    if (touchedCaptcha) {
      if (captchaValue === '') {
        setErrors({ ...errors, captcha: true });
      } else {
        setErrors({ ...errors, captcha: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captchaValue, touchedCaptcha]);

  useEffect(() => {
    // Gọi lần đầu khi component được render
    fetchCaptcha();

    // Thiết lập hẹn giờ để kiểm tra sau mỗi 2 phút
    const timer = setInterval(() => {
      const twoMinutesInMilliseconds = 2 * 60 * 1000;
      // Lấy giá trị mới nhất của counter
      const latestCounter = counter.current;
      if (Date.now() - latestCounter >= twoMinutesInMilliseconds) {
        // Đã qua 2 phút kể từ lần cuối cùng dispatch, fetch lại
        fetchCaptcha();
      }
    }, 1000);

    // Dọn dẹp khi component unmount
    return () => {
      clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('forgot-password')}>
      <h1 className={cx('forgot-password__heading', 'shine')}>{t('forgot-password.heading')}</h1>
      <p className={cx('forgot-password__desc')}>{t('forgot-password.desc01')}</p>

      <form
        className={cx('form')}
        onSubmit={(e) => {
          e.preventDefault();
          setButton(t('button.btn09'));
          setSubmit(true);
        }}
      >
        <div className={cx('form__group')}>
          <div className={cx('form__text-input')} style={errors.email !== '' ? { border: '1px solid #f44336' } : {}}>
            <input
              type="email"
              name=""
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setTouchedEmail(true);
              }}
              onBlur={() => setTouchedEmail(true)}
              placeholder={t('form.tp01')}
              className={cx('form__input')}
            />
            <EmailIcon className={cx('form__input-icon', errors.email && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.email}</p>
        </div>

        <div className={cx('form__group')}>
          <div className={cx('captcha')}>
            <div
              className={cx('form__text-input', 'captcha__input')}
              style={errors.captcha ? { border: '1px solid #f44336' } : {}}
            >
              <input
                maxLength={4}
                onChange={(e) => {
                  setCaptchaValue(e.target.value);
                  setTouchedCaptcha(true);
                }}
                onBlur={() => setTouchedCaptcha(true)}
                type="text"
                name=""
                placeholder="Captcha"
                className={cx('form__input')}
              />
            </div>
            {loading && <Oval width="30" color="#00b14f" />}
            {captchaSVG && !loading ? (
              <SvgComponent />
            ) : (
              !loading && <img src={images.defaultImg} className={cx('captcha__img')} alt="default-img" />
            )}
            <button
              type="button"
              className={cx('captcha__icon')}
              onClick={(e) => {
                e.preventDefault();
                fetchCaptcha();
              }}
            >
              <ReloadIcon />
            </button>
          </div>
        </div>

        <div style={submit ? { cursor: 'no-drop' } : {}} className={cx('form__group', 'forgot-password__btn-group')}>
          <Button primary auth disabled={submit}>
            {button}
          </Button>
        </div>
      </form>

      <p className={cx('forgot-password__footer')}>
        {t('forgot-password.desc02')}
        <Link className={cx('forgot-password__link')} to={routes.login}>
          {t('button.btn05')}
        </Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
