import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import styles from './AboutHaUIFood.module.scss';

import images from '~/assets/images';
import Button from '~/components/Button';
import routes from '~/config/routes';
import { EmailIcon, PhoneIcon, QuotesIcon, SendIcon, UserIcon } from '~/components/Icons';
import { contactUs } from '~/apiService/contactService';
import { clearError } from '~/apiService/authService';
import { statistical } from '~/apiService/statisticalService';

const cx = classNames.bind(styles);

function AboutHaUIFood() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);
  const phoneRegex = useMemo(() => /(((\+|)84)|0)(3|5|7|8|9)([0-9]{8})\b/, []);

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ email: '', phone: '', message: '' });
  const [submit, setSubmit] = useState(false);
  const [isEmailBlur, setIsEmailBlur] = useState(true);
  const [isMessageBlur, setIsMessageBlur] = useState(true);

  const messageRef = useRef(null);

  console.log(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactForm = {
      ...(fullname && { fullname: fullname.trim() }),
      ...(email && { email: email.trim() }),
      ...(phone && { phone: phone.trim() }),
      ...(message && { message: message.trim() }),
    };
    dispatch(contactUs(contactForm)).then((result) => {
      if (result.payload) {
        toast.success(t('contact.message'));
        setFullName('');
        setEmail('');
        setPhone('');
        setMessage('');
        messageRef.current.blur();
      }
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setSubmit(false);
    }
    return () => {
      dispatch(clearError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (phone.trim() === '') {
      setErrors({ ...errors, phone: '' });
    } else if (!phoneRegex.test(phone)) {
      setErrors({ ...errors, phone: t('errors.err08') });
    } else {
      setErrors({ ...errors, phone: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  useEffect(() => {
    let contentError = '';
    if (message.trim() === '') {
      contentError = t('errors.err09');
    } else if (message.length < 5 || message.length > 500) {
      contentError = t('errors.err10');
    }
    if (!isMessageBlur) {
      setErrors({ ...errors, message: contentError });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    let emailError = '';
    if (email.trim() === '') {
      emailError = t('errors.err11');
    } else if (!emailRegex.test(email)) {
      emailError = t('errors.err02');
    }
    if (!isEmailBlur) {
      setErrors({ ...errors, email: emailError });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    const isEmailValid = email !== '' && emailRegex.test(email);
    const isPhoneValid = phone === '' || phoneRegex.test(phone);
    const isContentPresent = message.trim() !== '' && message.length >= 5 && message.length <= 500;

    setSubmit(isEmailValid && isPhoneValid && isContentPresent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, phone, message]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className={cx('about')}>
      <img className={cx('about__img')} src={images.aboutOffice} alt="van-phong" />

      <div className={cx('container gx-5')}>
        <div className={cx('about__top')}>
          <h3 data-aos="zoom-in-right" className={cx('about__title')}>
            {t('about-HaUIFood.heading01')}
          </h3>
          <p data-aos="zoom-in-left" className={cx('about__desc')}>
            {t('about-HaUIFood.desc01')}
          </p>
          <p data-aos="zoom-in-left" className={cx('about__desc')}>
            {t('about-HaUIFood.desc02')}
          </p>
          <Link to={routes.home} rel="noreferrer" target="_blank" className={cx('about__btn')}>
            <Button more primary>
              {t('button.btn14')}
            </Button>
          </Link>
        </div>
        <div className={cx('about__intro')}>
          <div className={cx('about__intro-wrapper')}>
            <div className={cx('about__intro-item')} data-aos="fade-up-right">
              <h5 className={cx('about__intro-title')}>{t('about-HaUIFood.heading02')}</h5>
              <p className={cx('about__intro-desc')}>{t('about-HaUIFood.desc03')}</p>
            </div>
            <div className={cx('about__intro-item')} data-aos="fade-down-left">
              <h5 className={cx('about__intro-title')}>{t('about-HaUIFood.heading03')}</h5>
              <p className={cx('about__intro-desc')}>{t('about-HaUIFood.desc04')}</p>
            </div>
          </div>

          <div className={cx('about__intro-wrapper')}>
            <div className={cx('about__intro-item', 'about__intro-item--xl')}>
              <h5 data-aos="zoom-in-right" className={cx('about__intro-title')}>
                {t('about-HaUIFood.heading04')}
              </h5>
              <p data-aos="zoom-in-right" className={cx('about__intro-desc')}>
                {t('about-HaUIFood.desc05')}
              </p>

              <div className={cx('about__img-wrapper')}>
                <div className={cx('row')}>
                  <div className={cx('col col-12 col-xxl-4 col-xl-4 col-lg-6')}>
                    <div data-aos="zoom-in-right" className={cx('about__img-item')}>
                      <img src={images.simple} className={cx('about__img-thumb')} alt="simple" />
                      <h5 className={cx('about__img-title')}>{t('about-HaUIFood.heading05')}</h5>
                      <p className={cx('about__img-desc')}>{t('about-HaUIFood.desc06')}</p>
                    </div>
                  </div>
                  <div className={cx('col col-12 col-xxl-4 col-xl-4 col-lg-6')}>
                    <div data-aos="zoom-in" className={cx('about__img-item')}>
                      <img src={images.happy} className={cx('about__img-thumb')} alt="simple" />
                      <h5 className={cx('about__img-title')}>{t('about-HaUIFood.heading06')}</h5>
                      <p className={cx('about__img-desc')}>{t('about-HaUIFood.desc07')}</p>
                    </div>
                  </div>
                  <div className={cx('col col-12 col-xxl-4 col-xl-4 col-lg-6')}>
                    <div data-aos="zoom-in-left" className={cx('about__img-item')}>
                      <img src={images.together} className={cx('about__img-thumb')} alt="simple" />
                      <h5 className={cx('about__img-title')}>{t('about-HaUIFood.heading07')}</h5>
                      <p className={cx('about__img-desc')}>{t('about-HaUIFood.desc08')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx('about__main')}>
            <h3 className={cx('about__main-title')}>{t('about-HaUIFood.heading08')}</h3>

            <div className={cx('journey-list')}>
              <div className={cx('journey-item')}>
                <img data-aos="fade-right" src={images.trip2} alt="" className={cx('journey-item__img')} />
                <div className={cx('journey-item__dot')}></div>
                <div className={cx('journey-item__line')}></div>
                <div data-aos="fade-up-left" className={cx('journey-item__desc')}>
                  <h4 className={cx('title')}>{t('about-HaUIFood.heading09')}</h4>
                  <p className={cx('text')}>{t('about-HaUIFood.desc09')}</p>
                </div>
              </div>
              <div className={cx('journey-item')}>
                <img data-aos="fade-right" src={images.trip1} alt="" className={cx('journey-item__img')} />
                <div className={cx('journey-item__dot')}></div>
                <div className={cx('journey-item__line')}></div>
                <div data-aos="fade-up-left" className={cx('journey-item__desc')}>
                  <h4 className={cx('title')}>{t('about-HaUIFood.heading10')}</h4>
                  <p className={cx('text')}>{t('about-HaUIFood.desc10')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('about__footer')}>
        <div data-aos="zoom-in-right" className={cx('about__footer-word')}>
          <p className={cx('about__footer-text')}>
            <QuotesIcon className={cx('about__footer-quotes')} />
            {t('about-HaUIFood.desc11')}
            <QuotesIcon className={cx('about__footer-quotes', 'about__footer-quotes--close')} />
          </p>
        </div>
        <div className={cx('about__footer-bg')}></div>
      </div>

      <div className={cx('container')}>
        <div className={cx('about__contact')}>
          <h4 data-aos="fade-up-right" className={cx('about__contact-heading')}>
            {t('contact.heading')}
          </h4>
          <p data-aos="fade-up-right" className={cx('about__contact-desc')}>
            {t('contact.desc')}
          </p>
          <form data-aos="zoom-in-up" action="" className={cx('form')} autoComplete="off">
            <div className={cx('form__row', 'form__row--three')}>
              <div className={cx('form__group')}>
                <label htmlFor="fullname" className={cx('form__label', 'form__label--medium')}>
                  {t('form.tp03')}
                </label>
                <div className={cx('form__text-input', 'form__text-input--sm')}>
                  <input
                    value={fullname}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.startsWith(' ')) {
                        setFullName(value.trimStart());
                      } else {
                        setFullName(value);
                      }
                    }}
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder={t('form.tp03')}
                    className={cx('form__input')}
                  />

                  <UserIcon />
                </div>
              </div>
              <div className={cx('form__group')}>
                <label htmlFor="email" className={cx('form__label', 'form__label--medium')}>
                  {t('form.tp01')} <span style={{ color: '#f44336' }}>*</span>
                </label>
                <div
                  className={cx('form__text-input', 'form__text-input--sm')}
                  style={errors.email !== '' ? { border: '1px solid #f44336' } : {}}
                >
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    onFocus={() => setIsEmailBlur(false)}
                    onBlur={() => setIsEmailBlur(true)}
                    id="email"
                    type="email"
                    name="email"
                    placeholder={t('form.tp01')}
                    className={cx('form__input')}
                  />
                  <EmailIcon className={cx('form__input-icon', errors.email && 'form__input-icon--err')} />
                </div>
                <p className={cx('form__error')}>{errors.email}</p>
              </div>
              <div className={cx('form__group')}>
                <label htmlFor="phone" className={cx('form__label', 'form__label--medium')}>
                  {t('form.tp05')}
                </label>
                <div
                  className={cx('form__text-input', 'form__text-input--sm')}
                  style={errors.phone !== '' ? { border: '1px solid #f44336' } : {}}
                >
                  <input
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.startsWith(' ')) {
                        setPhone(value.trimStart());
                      } else {
                        setPhone(value);
                      }
                    }}
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder={t('form.tp05')}
                    className={cx('form__input')}
                  />
                  <PhoneIcon className={cx('form__input-icon', errors.phone && 'form__input-icon--err')} />
                </div>
                <p className={cx('form__error')}>{errors.phone}</p>
              </div>
            </div>
            <div className={cx('form__group')}>
              <label htmlFor="message" className={cx('form__label', 'form__label--medium')}>
                {t('form.tp06')} <span style={{ color: '#f44336' }}>*</span>
              </label>
              <div
                className={cx('form__text-area', 'form__text-area--sm')}
                style={errors.message !== '' ? { border: '1px solid #f44336' } : {}}
              >
                <textarea
                  ref={messageRef}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onFocus={() => setIsMessageBlur(false)}
                  onBlur={() => setIsMessageBlur(true)}
                  id="message"
                  name="message"
                  placeholder={t('form.tp06')}
                  className={cx('form__text-area-input')}
                ></textarea>
              </div>
              <p className={cx('form__error')}>{errors.message}</p>
            </div>
            <div className={cx('form__group')}>
              <div className={cx('about__contact-btn')}>
                <div style={!submit ? { cursor: 'no-drop' } : {}}>
                  <Button onClick={handleSubmit} send primary disabled={!submit || loading} rightIcon={<SendIcon />}>
                    {t('button.btn15')}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AboutHaUIFood;
