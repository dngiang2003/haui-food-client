import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './RestaurantHeader.module.scss';

import Slider from 'react-slick';
import { ArrowRightIcon, ArrowLeftIcon, ArrowDownIcon, StarIcon, ClockIcon, CalendarIcon } from '../Icons';

const cx = classnames.bind(styles);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return <div className={className} style={{ ...style, display: 'block', background: 'white' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;

  return <div className={className} style={{ ...style, display: 'block', background: 'black' }} onClick={onClick} />;
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 4,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const RestaurantHeader = ({ restaurant }) => {
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [isOpenAddr, setIsOpenAddr] = useState(false);
  const [isOpenShippingTime, setIsOpenShippingTime] = useState(false);
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isSlideFixed, setIsSlideFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const slide = document.querySelector('.slider-container');

      // Kiểm tra xem phần tử đã được tìm thấy hay chưa
      if (slide) {
        const slideTopPosition = slide.getBoundingClientRect().top;

        if (slideTopPosition <= 0) {
          setIsSlideFixed(true);
        } else {
          setIsSlideFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  // const [directories, setDirectories] = useState([]);
  useEffect(() => {
    if (restaurant) {
      setDeliveryAddress(restaurant.deliveryAddress[0]);
      setDeliveryTime(restaurant.deliveryTime[0]);
      setSlides(restaurant.directories);
    }
  }, [restaurant]);

  useEffect(() => {
    const handleScroll = () => {
      const remainingDistance = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);

      // Kiểm tra nếu còn ít hơn hoặc bằng 51px, ngăn chặn cuộn tiếp
      if (remainingDistance <= 51) {
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Thêm điều kiện kiểm tra trước khi thêm sự kiện cuộn
    if (document.documentElement.scrollHeight > window.innerHeight) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // const prevSlide = () => {
  //   let newIndex = currentIndex - 1;
  //   if (newIndex < 0) {
  //     newIndex = 0; // Quay lại slide cuối cùng nếu đang ở slide đầu tiên
  //   }
  //   setCurrentIndex(newIndex);
  // };

  // // Hàm để xử lý khi click nút Next
  // const nextSlide = () => {
  //   let newIndex = currentIndex + 1;
  //   if (newIndex >= slides.length) {
  //     newIndex = slides.length - 1; // Quay lại slide đầu tiên nếu đang ở slide cuối cùng
  //   }
  //   setCurrentIndex(newIndex);
  // };

  useEffect(() => {
    const handleScroll = () => {
      const remainingDistance = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);

      if (remainingDistance <= 15) {
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Thêm điều kiện kiểm tra trước khi thêm sự kiện cuộn
    if (document.documentElement.scrollHeight > window.innerHeight) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [restaurant, slides]);

  if (!restaurant || !deliveryAddress) {
    return null;
  }

  const toggleDropdownAddr = () => {
    setIsOpenAddr(!isOpenAddr);
    setIsOpenShippingTime(false);
  };

  const toggleDropdownTime = () => {
    setIsOpenShippingTime(!isOpenShippingTime);
    setIsOpenAddr(false);
  };

  const handleAddrItemClick = (value) => {
    console.log('Selected value:', value);
    setDeliveryAddress(value);
    setIsOpenAddr(false);
  };

  const handleTimeItemClick = (value) => {
    console.log('Selected value:', value);
    setDeliveryTime(value);
    setIsOpenShippingTime(false);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('banner')}>
        <img src={restaurant.banner} alt="" />
      </div>
      <div className={cx('header')}>
        <div className={cx('header__breadcrumb')}>
          <a href="/">Trang chủ</a>
          <ArrowRightIcon className={cx('arrowRightIcon')} />
          <a href="/restaurants">Nhà hàng</a>
          <ArrowRightIcon className={cx('arrowRightIcon')} />

          {/* name */}
          <span>{restaurant.restaurantName || ''}</span>
        </div>
        <h1>{restaurant.restaurantName || ''}</h1>

        {/* categories */}
        <div className={cx('header__cuisine')}>{restaurant.products}</div>
        <div className={cx('header__ratingAndDistance')}>
          <StarIcon className={cx('star-icon')} />
          <span>{restaurant.ratingStar}</span>
          <div className={cx('clock')}>
            <ClockIcon className={cx('clock-icon')} />
            <span>
              {restaurant.time} - {restaurant.distance}
            </span>
          </div>
        </div>
        {restaurant.openTime === '' ? (
          ''
        ) : (
          <div classnames={cx('header__openHours')}>
            <span>Giờ mở cửa</span>
            <span className={cx('header__openHours--hours')}>{restaurant.openTime}</span>
          </div>
        )}
        <div className={cx('header__promoWrapper')}>
          Ưu đãi <div className={cx('header__promoWrapper--detail')}>Xem chi tiết</div>
        </div>
        <div className={cx('header__selectBox')}>
          <div className={cx('date-box')}>
            <section className={cx('header__selectBox--selected')} onClick={toggleDropdownAddr}>
              <article className={cx('header__selectBox--selected--calendar')}>
                <div>
                  <CalendarIcon />
                  <span>{deliveryAddress}</span>
                </div>
                <ArrowDownIcon />
              </article>
            </section>
            {isOpenAddr && (
              <div className={cx('date-box__submenu')}>
                <ul className={styles.dropdownMenu}>
                  {restaurant.deliveryAddress.map((option, index) => (
                    <li key={index} onClick={() => handleAddrItemClick(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className={cx('time-box')}>
            <section className={cx('header__selectBox--selected')} onClick={toggleDropdownTime}>
              <article className={cx('header__selectBox--selected--timer')}>
                <div>
                  <ClockIcon /> <span>{deliveryTime}</span>
                </div>
                <ArrowDownIcon />
              </article>
            </section>
            {isOpenShippingTime && (
              <div className={cx('time-box__submenu')}>
                <ul className={styles.dropdownMenu}>
                  {restaurant.deliveryTime.map((option, index) => (
                    <li key={index} onClick={() => handleTimeItemClick(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* <div className={cx('slider-container', { 'fixed-slide': isSlideFixed })}>
          <div className={cx('slide-container')}>
            <button onClick={goToPrevSlide}>
              <ArrowLeftIcon className={cx('arrowLeftIcon')} />
            </button>

            <div className={cx('slides')} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {slides.map((slide, index) => (
                <div key={index} className={cx('slide')}>
                  {slide}
                </div>
              ))}
            </div>
            <button onClick={goToNextSlide}>
              <ArrowRightIcon className={cx('arrowRightIcon')} />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RestaurantHeader;
