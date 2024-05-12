import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Footer.module.scss';

import images from '~/assets/images';
import routes from '~/config/routes';
import { FacebookIcon, GithubIcon, InstagramIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Footer() {
  const { t } = useTranslation();
  const location = useLocation();

  const handleClick = (e) => {
    location.pathname === '/' || (location.pathname === '/#!' && e.preventDefault());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={cx('footer')}>
      <div className={cx('container gx-5')}>
        <Link to={routes.home} onClick={(e) => handleClick(e)}>
          <img src={images.logoVip1} alt="logo" className={cx('footer__logo')} />
        </Link>

        <div className={cx('separate')}></div>

        <div className={cx('row')}>
          <div className={cx('col col-xxl-3 col-xl-3 col-12')}>
            <ul>
              <li>
                <Link to={routes.aboutHaUIFood} onClick={(e) => handleClick(e)} className={cx('footer__item')}>
                  {t('footer.title01')}
                </Link>
              </li>
              <li>
                <Link to={routes.aboutDevelopmentTeam} onClick={(e) => handleClick(e)} className={cx('footer__item')}>
                  {t('footer.title03')}
                </Link>
              </li>
            </ul>
          </div>

          <div className={cx('col col-xxl-3 col-xl-3 col-12')}>
            <ul>
              <li>
                <Link to={'#!'} onClick={(e) => handleClick(e)} className={cx('footer__item')}>
                  {t('footer.title04')}
                </Link>
              </li>
              <li>
                <Link to={'#!'} onClick={(e) => handleClick(e)} className={cx('footer__item')}>
                  {t('footer.title05')}
                </Link>
              </li>
            </ul>
          </div>

          <div className={cx('col col-xxl-3 col-xl-3 col-12')}>
            <ul>
              <li>
                <Link to={'#!'} onClick={(e) => handleClick(e)} className={cx('footer__item')}>
                  {t('footer.title06')}
                </Link>
              </li>
              <li>
                <Link to={'#!'} onClick={(e) => handleClick(e)} className={cx('footer__item')}>
                  {t('footer.title07')}
                </Link>
              </li>
            </ul>
          </div>

          <div className={cx('col col-xxl-3 col-xl-3 col-12')}>
            <div className={cx('footer__socials')}>
              <a
                href="https://www.facebook.com/profile.php?id=61557360312825"
                rel="noreferrer"
                target="_blank"
                className={cx('footer__social-link')}
              >
                <FacebookIcon />
              </a>
              <a href="#!" rel="noreferrer" target="_blank" className={cx('footer__social-link')}>
                <InstagramIcon />
              </a>
              <a
                href="https://github.com/haui-food"
                rel="noreferrer"
                target="_blank"
                className={cx('footer__social-link')}
              >
                <GithubIcon />
              </a>
            </div>
          </div>
        </div>

        <div className={cx('separate')}></div>

        <div className={cx('footer__bottom')}>
          <div className={cx('footer__bottom-group')}>
            <p className={cx('footer__bottom-text')}>
              {t('footer.title08')}:
              <a href="mailto: info.hauifood@gmail.com" className={cx('footer__bottom-link')}>
                {' '}
                info.hauifood@gmail.com
              </a>
            </p>
          </div>
          <div className={cx('footer__bottom-group')}>
            <div className={cx('footer__bottom-wrapper')}>
              <p className={cx('footer__bottom-text')}>© 2024 HaUIFood</p>
            </div>
            <div className={cx('footer__bottom-wrapper')}>
              <p className={cx('footer__bottom-text')}>
                <a href="#!" className={cx('footer__bottom-link')}>
                  {t('footer.title07')}
                </a>
              </p>
              <span className={cx('dot-separate')}>•</span>
              <p className={cx('footer__bottom-text')}>
                <a href="#!" className={cx('footer__bottom-link')}>
                  {t('footer.title09')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
