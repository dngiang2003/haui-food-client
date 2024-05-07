import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import styles from './AboutDevelopmentTeam.module.scss';

import { statistical } from '~/apiService/statisticalService';
import images from '~/assets/images';
import { FacebookIcon, GithubIcon, InstagramIcon, SettingIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function AboutDevelopmentTeam() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
    <div className={cx('development-team')}>
      <div data-aos="fade-down-right" className={cx('development-team__top')}>
        <div className={cx('development-team__top-bg')}>
          <img loading="lazy" src={images.devBg1} alt="" className={cx('development-team__top-thumb')} />
          <SettingIcon className={cx('development-team__top-icon')} />
          <SettingIcon className={cx('development-team__top-icon', 'development-team__top-icon--bt')} />
        </div>
      </div>
      <div className={cx('development-team__main')}>
        <div className={cx('container gx-5')}>
          <div className={cx('development-team__heading')}>
            <h1 data-aos="fade-up-right" className={cx('title')}>
              {t('aboutDevelopmentTeam.heading')}
            </h1>
            <p data-aos="fade-up-left" className={cx('desc')}>
              {t('aboutDevelopmentTeam.desc')}
            </p>
          </div>
          <div className={cx('row justify-content-center')}>
            <div className={cx('col-12 col-xxl-4 col-xl-4 col-lg-6 col-md-6 cod-sm-12')}>
              <div data-aos="zoom-in-right" className={cx('developer')}>
                <div className={cx('developer__top')}>
                  <img loading="lazy" src={images.developer1} className={cx('developer__avatar')} alt="avatar" />
                  <div className={cx('developer__socials')}>
                    <div className={cx('developer__socials-info')}>
                      <div className={cx('developer__socials-list')}>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://www.facebook.com/Nhu.Cong1123"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <FacebookIcon className={cx('developer__socials-icon')} />
                        </a>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://www.instagram.com/cong_71017"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <InstagramIcon className={cx('developer__socials-icon')} />
                        </a>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://github.com/NhuCong11"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <GithubIcon className={cx('developer__socials-icon')} />
                        </a>
                      </div>
                    </div>
                    <div className={cx('developer__socials-bg')}></div>
                  </div>
                </div>
                <div className={cx('developer__info')}>
                  <h4 className={cx('developer__name')}>Nguyen Nhu Cong</h4>
                  <p className={cx('developer__desc')}>Frontend Developer</p>
                </div>
              </div>
            </div>
            <div className={cx('col-12 col-xxl-4 col-xl-4 col-lg-6 col-md-6 cod-sm-12')}>
              <div data-aos="zoom-in-up" className={cx('developer')}>
                <div className={cx('developer__top')}>
                  <img loading="lazy" src={images.developer3} className={cx('developer__avatar')} alt="avatar" />
                  <div className={cx('developer__socials')}>
                    <div className={cx('developer__socials-info')}>
                      <div className={cx('developer__socials-list')}>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://www.facebook.com/dngiang2003"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <FacebookIcon className={cx('developer__socials-icon')} />
                        </a>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://www.instagram.com/dngiang"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <InstagramIcon className={cx('developer__socials-icon')} />
                        </a>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://github.com/dngiang2003"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <GithubIcon className={cx('developer__socials-icon')} />
                        </a>
                      </div>
                    </div>
                    <div className={cx('developer__socials-bg')}></div>
                  </div>
                </div>
                <div className={cx('developer__info')}>
                  <h4 className={cx('developer__name')}>Do Ngoc Giang</h4>
                  <p className={cx('developer__desc')}>Backend Developer/Project Manager</p>
                </div>
              </div>
            </div>
            <div className={cx('col-12 col-xxl-4 col-xl-4 col-lg-6 col-md-6 cod-sm-12')}>
              <div data-aos="zoom-in-left" className={cx('developer')}>
                <div className={cx('developer__top')}>
                  <img loading="lazy" src={images.developer5} className={cx('developer__avatar')} alt="avatar" />
                  <div className={cx('developer__socials')}>
                    <div className={cx('developer__socials-info')}>
                      <div className={cx('developer__socials-list')}>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://www.facebook.com/profile.php?id=100009552092377"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <FacebookIcon className={cx('developer__socials-icon')} />
                        </a>
                        <a className={cx('developer__socials-link')} href="#!" rel="noreferrer" target="_blank">
                          <InstagramIcon className={cx('developer__socials-icon')} />
                        </a>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://github.com/lenghia0183"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <GithubIcon className={cx('developer__socials-icon')} />
                        </a>
                      </div>
                    </div>
                    <div className={cx('developer__socials-bg')}></div>
                  </div>
                </div>
                <div className={cx('developer__info')}>
                  <h4 className={cx('developer__name')}>Le Cong Nghia</h4>
                  <p className={cx('developer__desc')}>Frontend Developer</p>
                </div>
              </div>
            </div>
            <div className={cx('col-12 col-xxl-4 col-xl-4 col-lg-6 col-md-6 cod-sm-12')}>
              <div data-aos="zoom-in-right" className={cx('developer')}>
                <div className={cx('developer__top')}>
                  <img loading="lazy" src={images.developer2} className={cx('developer__avatar')} alt="avatar" />
                  <div className={cx('developer__socials')}>
                    <div className={cx('developer__socials-info')}>
                      <div className={cx('developer__socials-list')}>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://www.facebook.com/profile.php?id=100012048721594"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <FacebookIcon className={cx('developer__socials-icon')} />
                        </a>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://www.instagram.com/dungduc312"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <InstagramIcon className={cx('developer__socials-icon')} />
                        </a>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://github.com/VDucDung"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <GithubIcon className={cx('developer__socials-icon')} />
                        </a>
                      </div>
                    </div>
                    <div className={cx('developer__socials-bg')}></div>
                  </div>
                </div>
                <div className={cx('developer__info')}>
                  <h4 className={cx('developer__name')}>Vu Duc Dung</h4>
                  <p className={cx('developer__desc')}>Backend Developer</p>
                </div>
              </div>
            </div>
            <div className={cx('col-12 col-xxl-4 col-xl-4 col-lg-6 col-md-6 cod-sm-12')}>
              <div data-aos="zoom-in-left" className={cx('developer')}>
                <div className={cx('developer__top')}>
                  <img loading="lazy" src={images.developer4} className={cx('developer__avatar')} alt="avatar" />
                  <div className={cx('developer__socials')}>
                    <div className={cx('developer__socials-info')}>
                      <div className={cx('developer__socials-list')}>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://www.facebook.com/loc.trinhgia.7"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <FacebookIcon className={cx('developer__socials-icon')} />
                        </a>
                        <a className={cx('developer__socials-link')} href="#!" rel="noreferrer" target="_blank">
                          <InstagramIcon className={cx('developer__socials-icon')} />
                        </a>
                        <a
                          className={cx('developer__socials-link')}
                          href="https://github.com/Gialoocj"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <GithubIcon className={cx('developer__socials-icon')} />
                        </a>
                      </div>
                    </div>
                    <div className={cx('developer__socials-bg')}></div>
                  </div>
                </div>
                <div className={cx('developer__info')}>
                  <h4 className={cx('developer__name')}>Trinh Gia Loc</h4>
                  <p className={cx('developer__desc')}>Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutDevelopmentTeam;
