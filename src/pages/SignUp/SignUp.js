import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Oval } from '@agney/react-loading';

import styles from './SignUp.module.scss';
import { EmailIcon, PasswordIcon, UserIcon } from '~/components/Icons';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import routes from '~/config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, registerUser } from '~/apiService/authService';
import { statistical } from '~/apiService/statisticalService';

const cx = classNames.bind(styles);

function SignUp() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    return () => {
      dispatch(clearError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(true);
  const [showPassword, setShowPassword] = useState('password');

  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);
  const passwordRegex = useMemo(() => /^(?=.*[@-_]).{8,}$/, []);
  const [errors, setErrors] = useState({ fullname: '', email: '', password: '' });

  const checkSubmit = useCallback(() => {
    setSubmit(
      !emailRegex.test(email) || !passwordRegex.test(password) || fullname === '' || email === '' || password === '',
    );
  }, [emailRegex, passwordRegex, fullname, email, password]);

  const handleCheckFullName = useCallback(() => {
    if (!fullname || !fullname.trim()) {
      setErrors({ ...errors, fullname: t('errors.err05') });
    } else {
      setErrors({ ...errors, fullname: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullname, errors]);

  const handleChangeEmail = useCallback(() => {
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: t('errors.err02') });
    }
    if (!email) {
      setErrors({ ...errors, email: t('errors.err01') });
    }
    if (emailRegex.test(email)) {
      setErrors({ ...errors, email: '' });
    }
    checkSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, checkSubmit, emailRegex, errors]);

  const handleChangePassword = useCallback(() => {
    if (!passwordRegex.test(password)) {
      setErrors({
        ...errors,
        password: t('errors.err04'),
      });
    }
    if (passwordRegex.test(password)) {
      setErrors({ ...errors, password: '' });
    }
    if (!password) {
      setErrors({ ...errors, password: t('errors.err03') });
    }
    checkSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordRegex, password, errors, checkSubmit]);

  const handleShowPassword = () => {
    setShowPassword(showPassword === 'password' ? 'text' : 'password');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ fullname, email, password })).then((result) => {
      if (result.payload) {
        setTimeout(() => {
          navigate('/auth/login');
        }, 3500);
        toast.success(t('sign-up.notify'));
      }
    });
  };

  useEffect(() => {
    if (passwordRegex.test(password) && emailRegex.test(email) && fullname !== '') {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
    if (passwordRegex.test(password)) {
      setErrors({ ...errors, password: '' });
    }
  }, [password, passwordRegex, email, emailRegex, fullname, errors]);

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
    <div className={cx('signup')}>
      <h1 className={cx('signup__heading', 'shine')}>{t('sign-up.heading')}</h1>
      <p className={cx('signup__desc')}>{t('sign-up.desc01')}</p>

      <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
        <div className={cx('form__group')}>
          <div className={cx('form__text-input')} style={errors.fullname !== '' ? { border: '1px solid #f44336' } : {}}>
            <input
              type="text"
              name=""
              readOnly={loading}
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={handleCheckFullName}
              placeholder={t('form.tp03')}
              className={cx('form__input')}
            />
            <UserIcon className={cx('form__input-icon', errors.fullname && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.fullname}</p>
        </div>

        <div className={cx('form__group')}>
          <div className={cx('form__text-input')} style={errors.email !== '' ? { border: '1px solid #f44336' } : {}}>
            <input
              type="email"
              name=""
              readOnly={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleChangeEmail}
              placeholder={t('form.tp01')}
              className={cx('form__input')}
            />
            <EmailIcon className={cx('form__input-icon', errors.email && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.email}</p>
        </div>

        <div className={cx('form__group')}>
          <div className={cx('form__text-input')} style={errors.password !== '' ? { border: '1px solid #f44336' } : {}}>
            <input
              readOnly={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleChangePassword}
              type={showPassword}
              name="password"
              placeholder={t('form.tp02')}
              className={cx('form__input')}
            />
            <PasswordIcon className={cx('form__input-icon', errors.password && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.password}</p>
        </div>

        <div className={cx('form__group', 'form__group--inline')}>
          <label onChange={handleShowPassword} className={cx('form__checkbox')}>
            <input type="checkbox" name="" className={cx('form__checkbox-input')} />
            <span className={cx('form__checkbox-label')}>{t('form.lb01')}</span>
          </label>
        </div>

        <div style={submit ? { cursor: 'no-drop' } : {}} className={cx('form__group', 'signup__btn-group')}>
          <Button
            primary
            auth
            disabled={submit || loading}
            onClick={(e) => handleRegister(e)}
            leftIcon={loading && <Oval width="20" color="#fff" />}
          >
            {t('button.btn07')}
          </Button>
        </div>
      </form>

      <p className={cx('signup__footer')}>
        {t('sign-up.desc02')}
        <Link className={cx('signup__link')} to={routes.login}>
          {t('button.btn05')}
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
