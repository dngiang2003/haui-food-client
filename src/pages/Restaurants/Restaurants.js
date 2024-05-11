import classNames from 'classnames/bind';
import styles from './Restaurants.module.scss';
import { useParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import ListSlider from '~/components/ListSlider/ListSlider';
import RestaurantList from '~/components/RestaurantList';
import BreadCrumb from '~/components/BreadCrumb/BreadCrumb';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Restaurants() {
  const { t } = useTranslation();
  const url = useLocation();

  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { category } = useParams();
  const query = searchParams.get('q');

  const getPageType = () => {
    let pageType = 'restaurants';
    if (url.pathname.includes('restaurants')) {
      pageType = 'restaurants';
    }
    if (category) {
      pageType = 'restaurantsBycategory';
    }
    return pageType;
  };
  const [currentPageType, setCurrentPageType] = useState(getPageType());

  // console.log(category);
  // console.log(query);
  // kiểm tra xem đang là page restaurant hay restaurant by category

  console.log('re-render');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (url.pathname.includes('restaurants')) {
      setCurrentPageType('restaurants');
    }
    if (category) {
      setCurrentPageType('restaurantsBycategory');
    }
  }, [category, url.pathname, query]);

  const handleClick = (e) => {
    if (searchValue.trim()) {
      navigate(`/restaurants?q=${searchValue}`);
    }
    e.target.blur();
  };
  // console.log(currentPageType);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('restaurant__search-container')}>
          <SearchIcon className={cx('restaurant__search-icon')} />
          <input
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleClick(e);
              }
            }}
            value={searchValue}
            id="restaurant-search"
            type="text"
            className={cx('restaurant__search')}
            placeholder=""
          />
          <label htmlFor="restaurant-search" className={cx('restaurant__search-label')}>
            {t('restaurant.placeholder')}
          </label>
        </div>
      </div>
      <div className={cx('restaurant__sparate')}></div>
      <div className={cx('container')}>
        <div className={cx('restaurant')}>
          <BreadCrumb className={cx('restaurant__breadcrumb')} />
          {currentPageType === 'restaurants' && !query && (
            <div className={cx('restaurant__popular-list')}>
              <div className={cx('restaurant__popular-title')}>
                {t('restaurant.title01')} <span className={cx('restaurant__popular-title--highlight')}>HauiFood</span>
              </div>
              <ListSlider />

              <div className={cx('restaurant__popular-title')}>
                {t('restaurant.title02')} <span className={cx('restaurant__popular-title--highlight')}>HauiFood</span>
              </div>
            </div>
          )}

          {currentPageType === 'restaurantsBycategory' && (
            <div className={cx('restaurant__popular-list')}>
              <div className={cx('restaurant__popular-title')}>
                {t('restaurant.title02')}
                <span className={cx('restaurant__popular-title--highlight')}>HauiFood</span>
              </div>
            </div>
          )}
          {query && (
            <div className={cx('restaurant__popular-title')}>
              {query} {t('restaurant.at')} <span className={cx('restaurant__popular-title--highlight')}>HauiFood</span>
            </div>
          )}
          <div className={cx('restaurant__list')}>
            <RestaurantList category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Restaurants);
