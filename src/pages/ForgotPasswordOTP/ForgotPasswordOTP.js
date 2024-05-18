import { createRef, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import styles from './ForgotPasswordOTP.module.scss';

import Button from '~/components/Button';
import routes from '~/config/routes';
import { verifyOtpForgotPassword } from '~/apiService/authService';
import config from '~/config';
import { statistical } from '~/apiService/statisticalService';

const cx = classNames.bind(styles);

function ForgotPasswordOTP() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxData = useSelector((prop) => prop.auth);

  const [button, setButton] = useState(t('button.btn10'));
  const [submit, setSubmit] = useState(false);
  const [inputs, setInputs] = useState(Array(6).fill(''));

  const inputRefs = useRef(
    Array(6)
      .fill(0)
      .map(() => createRef()),
  );

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index === 5 && !inputs[index]) {
      setInputs(Array(6).fill(''));
      inputRefs.current[0].current.focus();
    } else if (e.key === 'Backspace' && index > 0 && !inputs[index]) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const pasteArray = pasteData.split('');
    if (pasteArray.length === 6) {
      setInputs(pasteArray);
      setSubmit(true);
      inputRefs.current[5].current.focus();
    } else if (pasteArray.length < 6) {
      setSubmit(false);
    }
  };

  const handleChange = (e, index) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Chỉ cho phép nhập số
    const newInputs = [...inputs];
    newInputs[index] = numericValue.slice(0, 1); // Giới hạn giá trị nhập vào
    setInputs(newInputs);

    // Không chuyển sang ô nhập khác nếu giá trị không phải số
    if (numericValue && index < 5) {
      inputRefs.current[index + 1].current.focus();
    }

    if (newInputs.every((input) => input !== '')) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  };

  const handleForgotPasswordOTP = () => {
    const tokenForgot = JSON.parse(sessionStorage.getItem('tokenForgot'));
    const code = inputs.join('');
    dispatch(verifyOtpForgotPassword({ tokenForgot: tokenForgot, otp: code })).then((result) => {
      if (result.payload.code === 200) {
        sessionStorage.setItem('tokenVerifyOTP', JSON.stringify(result.payload.data.tokenVerifyOTP));
        navigate(config.routes.resetPassword, { replace: true });
      } else if (result.payload.code === 400) {
        toast.error(result.payload.message);
        navigate(config.routes.forgotPassword);
      } else {
        toast.error(result.payload.message);
        setSubmit(false);
        setInputs(Array(6).fill(''));
        setButton(t('button.btn10'));
      }
    });
  };

  useEffect(() => {
    dispatch(statistical())
      .then((result) => {
        if (result.payload.code !== 200) {
          toast.error(result.payload.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('verify-otp')}>
      <h1 className={cx('verify-otp__heading', 'shine')}>{t('login-with-2fa.heading')}</h1>
      <p className={cx('verify-otp__desc')}>{t('verify-otp.heading')}</p>

      <form
        className={cx('form')}
        onSubmit={(e) => {
          e.preventDefault();
          setButton(t('button.btn11'));
          setSubmit(true);
        }}
      >
        <div className={cx('form__group', 'form__group--inline')}>
          {inputs.map((value, index) => (
            <div key={index} className={cx('form__text-input')}>
              <input
                ref={inputRefs.current[index]}
                autoFocus={index === 0}
                value={value}
                onPaste={handlePaste}
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                type="text"
                inputMode="numeric"
                name=""
                autoComplete="off"
                className={cx('form__input', 'form__input--center')}
              />
            </div>
          ))}
        </div>

        <div style={submit ? { cursor: 'no-drop' } : {}} className={cx('form__group', 'verify-otp__btn-group')}>
          <Button
            primary
            auth
            disabled={!submit || reduxData.loading}
            onClick={() => {
              handleForgotPasswordOTP();
            }}
          >
            {button}
          </Button>
        </div>
      </form>

      <p className={cx('verify-otp__footer')}>{t('verify-otp.desc01')}</p>
    </div>
  );
}

export default ForgotPasswordOTP;
