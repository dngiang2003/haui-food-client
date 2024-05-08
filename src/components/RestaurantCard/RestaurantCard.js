import classNames from 'classnames/bind';

import styles from './RestaurantCard.module.scss';
import { EmptyStarIcon, HaftStarIcon, StarIcon } from '../Icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function RestaurantCard({ data, className }) {
  const rating = data.rating || 0;
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars !== 0;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) stars.push(<StarIcon className={cx('star-icon')} />);
    else if (i === fullStars + 1 && halfStars) stars.push(<HaftStarIcon className={cx('star-icon')} />);
    else stars.push(<EmptyStarIcon className={cx('star-icon')} />);
  }
  console.log(data);
  return (
    <Link to={`/restaurant/${data?.slug}`}>
      <div
        className={cx('restaurant-card', className)}
        onClick={() => {
          sessionStorage.setItem('restaurantIDSelected', JSON.stringify(data._id));
          sessionStorage.setItem('restaurantSelected', JSON.stringify({ name: data?.fullname, slug: data?.slug }));
        }}
      >
        <div className={cx('restaurant-card__label')}>
          <span className={cx('restaurant-card__label-text')}>HFood</span>
          <div className={cx('restaurant-card__label-tail')}></div>
        </div>

        <img src={data?.background} className={cx('restaurant-card__img')} alt="" />
        <div className={cx('restaurant-card__content')}>
          <div className={cx('restaurant-card__name')}>{data?.fullname}</div>

          <div className={cx('restaurant-card__categorise')}>{data?.description}</div>
          <div className={cx('restaurant-card__rating-container')}>
            <div className={cx('restaurant-card__rating')}>{data?.rating}</div>
            <div className={cx('star-container')}>
              {stars.map((star, index) => {
                return <span key={index}>{star}</span>;
              })}
            </div>
            <div className={cx('restaurant-card__rating')}>Reviews</div>
          </div>

          <div className={cx('restaurant-card__discount-container')}>
            <div className={cx('restaurant-card__discount-tag')}></div>
            <div className={cx('restaurant-card__discount-text')}>Rất nhiều ưu đãi</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;
