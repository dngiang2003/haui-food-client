import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Oval } from '@agney/react-loading';
import { useGoogleLogin } from '@react-oauth/google';

import styles from './SignIn.module.scss';
import { EmailIcon, GoogleIcon, PasswordIcon } from '~/components/Icons';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import routes from '~/config/routes';
import { loginUser } from '~/apiService/authService';

import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle } from '~/apiService/loginWithGoogleService';
const cx = classNames.bind(styles);

function SignIn() {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(true);
  const [showPassword, setShowPassword] = useState('password');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const isLogin = useSelector((state) => state.auth.isLogin);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     setSubmit(false);
  //   }

  //   return () => {
  //     dispatch(clearError());
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [error]);

  const login = useGoogleLogin({
    onSuccess: async (response) =>
      dispatch(loginWithGoogle(response)).then((result) => {
        console.log(result);

        if (result.payload.status === 200) {
          localStorage.setItem('accessToken', JSON.stringify(result.payload.access_token));
          toast.success(t('login.notify01'));
          navigate('/');
        } else if (result.payload.status === 400 || result.payload.status === 401 || result.payload.status === 429) {
          toast.error(result.payload.statusText);
        }
      }),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);
  const passwordRegex = useMemo(() => /^(?=.*[@-_]).{8,}$/, []);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const checkSubmit = useCallback(() => {
    setSubmit(!emailRegex.test(email) || !passwordRegex.test(password) || email === '' || password === '');
  }, [emailRegex, passwordRegex, email, password]);

  const handleChangeEmail = useCallback(() => {
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: t('errors.err02') });
    }
    if (email === '') {
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
    if (password === '') {
      setErrors({ ...errors, password: t('errors.err03') });
    }
    checkSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordRegex, password, errors, checkSubmit]);

  const handleShowPassword = () => {
    setShowPassword(showPassword === 'password' ? 'text' : 'password');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
    checkSubmit();
  };

  const handleSubmit = (e) => {
    const token = localStorage.getItem('accessToken');
    e.preventDefault();
    setSubmit(true);
    if (token || isLogin) {
      toast.warning(t('login.notify03'));
      navigate('/');
      return;
    }

    dispatch(loginUser(loginForm)).then((result) => {
      console.log(result);

      // if (result.payload.code === 202) {
      //   navigate('/auth/verify-otp');
      // }

      if (result.payload.code === 200) {
        toast.success(t('login.notify01'));
        navigate('/');
      } else if (result.payload.code === 400 || result.payload.code === 401 || result.payload.code === 429) {
        toast.error(result.payload.message);
      }
    });
  };

  useEffect(() => {
    if (passwordRegex.test(password) && emailRegex.test(email)) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
    if (passwordRegex.test(password)) {
      setErrors({ ...errors, password: '' });
    }
  }, [password, passwordRegex, email, emailRegex, errors]);

  return (
    <div className={cx('login')}>
      <h1 className={cx('login__heading', 'shine')}>{t('login.heading')}</h1>
      <p className={cx('login__desc')}>{t('login.desc01')}</p>

      <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
        <div className={cx('form__group')}>
          <div className={cx('form__text-input')} style={errors.email !== '' ? { border: '1px solid #f44336' } : {}}>
            <input
              type="email"
              name="email"
              value={email}
              readOnly={loading}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange(e);
              }}
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
              value={password}
              readOnly={loading}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange(e);
              }}
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
          <Link className={cx('login__link', 'form__pull-right')} to={routes.forgotPassword}>
            {t('forgot-password.heading')}
          </Link>
        </div>

        <div style={submit ? { cursor: 'no-drop' } : {}} className={cx('form__group', 'login__btn-group')}>
          <Button
            primary
            auth
            disabled={submit || loading}
            onClick={handleSubmit}
            leftIcon={loading && <Oval width="20" color="#fff" />}
          >
            {t('button.btn05')}
          </Button>
          <Button onClick={() => login()} authGoogle leftIcon={<GoogleIcon className={cx('icon-google')} />}>
            {t('button.btn06')}
          </Button>
        </div>
      </form>

      <p className={cx('login__footer')}>
        {t('login.desc02')}
        <Link className={cx('login__link')} to={routes.signup}>
          {t('button.btn07')}
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
