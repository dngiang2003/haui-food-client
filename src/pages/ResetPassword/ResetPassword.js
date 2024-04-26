import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './ResetPassword.module.scss';
import { PasswordIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { useDispatch } from 'react-redux';
import { resetPassword } from '~/apiService/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function ResetPassword() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState('password');

  const passwordRegex = useMemo(() => /^(?=.*[@-_]).{8,}$/, []);
  const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });

  const checkSubmit = useCallback(() => {
    let isSubmit = false;

    if (!newPassword || !confirmNewPassword) {
      setSubmit(isSubmit);
      return;
    }
    console.log(errors);
    isSubmit = Object.values(errors).every((err) => err === '');
    console.log(Object.values(errors).every((err) => err === ''));
    setSubmit(isSubmit);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordRegex, newPassword, confirmNewPassword]);

  const handleChangeNewPassword = useCallback(
    (e) => {
      // lay giá trị của new password
      const value = e.target.value;
      setNewPassword(value);
      if (!passwordRegex.test(value)) {
        setErrors({
          ...errors,
          newPassword: t('errors.err04'),
        });
      }
      if (passwordRegex.test(value)) {
        setErrors({ ...errors, newPassword: '' });
      }
      if (!value) {
        //t('errors.err03')
        setErrors({ ...errors, newPassword: '' });
      }
      checkSubmit();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [passwordRegex, newPassword, errors, checkSubmit],
  );

  const handleChangeConfirmPassword = useCallback(
    (e) => {
      const value = e.target.value;
      setConfirmNewPassword(value);
      if (value !== newPassword) {
        setErrors({ ...errors, confirmPassword: t('errors.err06') });
      }
      // if (!value) {
      //   setErrors({ ...errors, confirmPassword: t('errors.err07') });
      // }
      if (value === newPassword || value === '') {
        setErrors({ ...errors, confirmPassword: '' });
      }
      checkSubmit();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [confirmNewPassword, newPassword, errors],
  );

  const handleShowPassword = () => {
    setShowPassword(showPassword === 'password' ? 'text' : 'password');
  };

  const handleResetPassword = () => {
    const tokenVerifyOTP = JSON.parse(sessionStorage.getItem('tokenVerifyOTP'));
    const data = {
      tokenVerifyOTP: tokenVerifyOTP,
      newPassword: newPassword,
    };
    dispatch(resetPassword(data)).then((result) => {
      console.log(result.payload);

      if (result.payload.code === 200) {
        toast.success(result.payload.message);
        navigate(config.routes.login);
      } else {
        toast.error(result.payload.message);
      }
    });
  };

  return (
    <div className={cx('reset-password')}>
      <h1 className={cx('reset-password__heading', 'shine')}>{t('reset-password.heading')}</h1>
      <p className={cx('reset-password__desc')}>{t('reset-password.desc01')}</p>

      <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
        <div className={cx('form__group')}>
          <div
            className={cx('form__text-input')}
            style={errors.newPassword !== '' ? { border: '1px solid #f44336' } : {}}
          >
            <input
              value={newPassword}
              onChange={(e) => {
                handleChangeNewPassword(e);
              }}
              onBlur={handleChangeNewPassword}
              type={showPassword}
              name=""
              placeholder={t('form.tp02')}
              className={cx('form__input')}
            />
            <PasswordIcon className={cx('form__input-icon', errors.newPassword && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.newPassword}</p>
        </div>

        <div className={cx('form__group')}>
          <div
            className={cx('form__text-input')}
            style={errors.confirmPassword !== '' ? { border: '1px solid #f44336' } : {}}
          >
            <input
              value={confirmNewPassword}
              onChange={(e) => {
                handleChangeConfirmPassword(e);
                // setConfirmNewPassword(e.target.value);
              }}
              onBlur={handleChangeConfirmPassword}
              type={showPassword}
              name=""
              placeholder={t('form.tp04')}
              className={cx('form__input')}
            />
            <PasswordIcon className={cx('form__input-icon', errors.confirmPassword && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.confirmPassword}</p>
        </div>

        <div className={cx('form__group', 'form__group--inline')}>
          <label onChange={handleShowPassword} className={cx('form__checkbox')}>
            <input type="checkbox" name="" className={cx('form__checkbox-input')} />
            <span className={cx('form__checkbox-label')}>{t('form.lb01')}</span>
          </label>
        </div>

        <div style={submit ? { cursor: 'no-drop' } : {}} className={cx('form__group', 'reset-password__btn-group')}>
          <Button
            primary
            auth
            disabled={!submit}
            onClick={() => {
              handleResetPassword();
            }}
          >
            {t('button.btn12')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
