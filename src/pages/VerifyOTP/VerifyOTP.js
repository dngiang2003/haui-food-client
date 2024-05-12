import { createRef, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './VerifyOTP.module.scss';

import Button from '~/components/Button';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function VerifyOTP() {
  const { t } = useTranslation();

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
      inputRefs.current[5].current.focus();
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
  };

  return (
    <div className={cx('verify-otp')}>
      <h1 className={cx('verify-otp__heading', 'shine')}>{t('verify-otp.heading')}</h1>
      <p className={cx('verify-otp__desc')}>{t('verify-otp.desc01')}</p>

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
                name=""
                className={cx('form__input', 'form__input--center')}
              />
            </div>
          ))}
        </div>

        <div style={submit ? { cursor: 'no-drop' } : {}} className={cx('form__group', 'verify-otp__btn-group')}>
          <Button primary auth disabled={submit}>
            {button}
          </Button>
        </div>
      </form>

      <p className={cx('verify-otp__footer')}>
        {t('forgot-password.desc02')}
        <Link className={cx('verify-otp__link')} to={routes.login}>
          {t('button.btn05')}
        </Link>
      </p>
    </div>
  );
}

export default VerifyOTP;
