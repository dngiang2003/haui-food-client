import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styles from './Home.module.scss';

import Banner from '~/components/Banner/Banner';
import ListSlider from '~/components/ListSlider/ListSlider';
import Button from '~/components/Button/Button';
import ListCategorise from '~/components/ListCategorise/ListCategorise';
import { CheckIcon, CircleCloseIcon } from '~/components/Icons';
import images from '~/assets/images';
import ListResult from '~/components/ListResult/ListResult';
import Loader from '~/components/Loader';

const cx = classNames.bind(styles);

function Home() {
  const { t } = useTranslation();

  const listReasons = [
    {
      icon: CheckIcon,
      keyword: t('home.reasonKeyword01'),
      text: t('home.reasonText01'),
    },
    {
      icon: CheckIcon,
      keyword: t('home.reasonKeyword02'),
      text: t('home.reasonText02'),
    },
    {
      icon: CheckIcon,
      keyword: t('home.reasonKeyword03'),
      text: t('home.reasonText03'),
    },
    {
      icon: CheckIcon,
      keyword: t('home.reasonKeyword04'),
      text: t('home.reasonText04'),
    },
    {
      icon: CheckIcon,
      keyword: t('home.reasonKeyword05'),
      text: t('home.reasonText05'),
    },
  ];

  const [isSearch, setIsSearch] = useState('false');
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const [isRemove, setIsRemove] = useState(false);
  const [isFirstMount, setFirstMount] = useState(true);
  const loadingRef = useRef();

  const reduxData = useSelector((prop) => prop.product);

  const handleRemove = () => {
    setIsRemove(false);
  };

  const handleToggleSearch = (type) => {
    setIsSearch(type);
  };

  const hanldeSearchResult = (searchResult) => {
    setSearchResult(searchResult);
  };

  const handleChangePage = (value) => {
    setPage(value);
  };

  useEffect(() => {
    setFirstMount(false);
  }, []);

  // scroll lên đầu trang khi chọn trang khác
  useEffect(() => {
    if (isFirstMount) {
      return;
    }

    const isMoblie = window.matchMedia('(max-width: 960px)');

    if (loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (isMoblie.matches) {
        loadingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className={cx('home')}>
      <div>
        <Banner
          onSearch={handleToggleSearch}
          onSearchResult={hanldeSearchResult}
          onPage={page}
          onHandleRemove={handleRemove}
          onRemove={isRemove}
        />
      </div>
      <div className={cx('sparate')}></div>
      <div className={cx('container gx-5')}>
        {reduxData.loading && (
          <div className={cx('home__search-loading-container')}>
            <Loader className={cx('home__loading-icon')} />
          </div>
        )}
        <div
          ref={loadingRef}
          className={cx(
            { 'home__search-result-loading': isSearch === 'loading' },
            'home__search-result-container',
            { 'home__search-result-show': isSearch === 'true' },
            { 'home__search-result-hidden': isSearch === 'false' },
          )}
        >
          <div className={cx('home__search-title-container')}>
            <div className={cx('home__search-title')}>Search Result</div>
            <div
              onClick={() => {
                setIsRemove(true);
                handleToggleSearch('false');
              }}
            >
              <div className={cx('home__close-container')}>
                <div className={cx('home__remove-tilte')}>Remove</div>
                <CircleCloseIcon className={cx('home__close-icon')} />
              </div>
            </div>
          </div>
          <ListResult data={searchResult} onChangePage={handleChangePage} />
        </div>

        <h1 className={cx('home__title-1')}>
          {t('home.title01')} <span className={cx('home__title-1--highlight')}>Haui</span>
        </h1>

        <div>
          <ListSlider />
        </div>

        <Button large className={cx('home__btn')} to={'restaurants'}>
          See All promotions
        </Button>

        <div className={cx('home__title-2', 'home__title--margin')}>{t('home.title02')}</div>

        <ListCategorise />

        <div className={cx('home__title-3', 'home__title--no-margin')}>{t('home.title03')}</div>

        <div className={cx('reason-container')}>
          {listReasons.map((reason, index) => {
            const Icon = reason.icon || <></>;

            return (
              <div className={cx('reason-item')} key={index}>
                <Icon className={cx('reason-item__check-icon')} />
                <p className={cx('reason-item__text')}>
                  <span className={cx('reason-item__keyword')}>{reason.keyword}</span> - {reason.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className={cx('home__title-4')}>{t('home.title04')}</div>
        <div className={cx('home__sub-title')}>{t('home.subtitle')}</div>
        <p className={cx('home__faq-text')}>{t('home.desc01')}</p>

        <Button large className={cx('home__btn')} to={'about/haui-food'}>
          Read More
        </Button>
      </div>
      <div className={cx('banner-footer')}>
        <div className={cx('container gx-5')}>
          <div className={cx('row')}>
            <div className={cx('col-md-6 col-12')}>
              <div className={cx('banner-footer__left')}>
                <img
                  src="https://food.grab.com/static/page-home/bottom-food-options.svg"
                  alt="HauiFood"
                  className={cx('banner-footer__left-img')}
                />

                <div className={cx('banner-footer__title')}>{t('home.title05')}</div>
                <p className={cx('banner-footer__desc')}>{t('home.desc02')}</p>
              </div>
            </div>
            <div className={cx('col-md-6 col-12')}>
              <div className={cx('banner-footer__right')}>
                <img
                  src="https://food.grab.com/static/images/ilus-cool-features-app.svg"
                  alt="HauiFood"
                  className={cx('banner-footer__right-img')}
                />
                <div className={cx('banner-footer__title')}>{t('home.title06')}</div>
                <p className={cx('banner-footer__desc')}>{t('home.desc03')}</p>

                <div className={cx('banner-footer__logo-container')}>
                  <img src={images.appStore} className={cx('banner-footer__logo')} alt="" />
                  <img src={images.googlePlay} className={cx('banner-footer__logo')} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
