import classNames from 'classnames/bind';
import styles from './ListSlider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RestaurantCard from '~/components/RestaurantCard/RestaurantCard';
import Slider from 'react-slick';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsForListSlider } from '~/apiService/restaurantService';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function NextArrow(props) {
  const { className, style, onClick, customClass } = props;
  return (
    <div
      className={`${className} ${customClass}`}
      style={{ ...style, display: 'block', color: 'rgb(103, 103, 103)' }}
      onClick={onClick}
    ></div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick, customClass } = props;
  return (
    <div
      className={`${className} ${customClass}`}
      style={{ ...style, display: 'block', color: 'rgb(103, 103, 103)' }}
      onClick={onClick}
    ></div>
  );
}

function ListSlider() {
  const [data, setData] = useState([]);
  const [hasData, setHasData] = useState(false);

  const dispatch = useDispatch();
  const reduxData = useSelector((prop) => prop.restaurant);

  // console.log(reduxData);

  useEffect(() => {
    if (reduxData.listSlider?.length > 0) {
      setHasData(true);
      setData(reduxData.listSlider);
    } else {
      dispatch(getRestaurantsForListSlider({ limit: 5, page: 1 })).then((result) => {
        if (result.payload.code === 200) {
          // console.log(result.payload);
          setData(result.payload.data.shops);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    speed: 500,
    className: cx('list-slider'),
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    nextArrow: <NextArrow customClass={cx('next-arrow')} />,
    prevArrow: <PrevArrow customClass={cx('prev-arrow')} />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          nextArrow: <></>,
          prevArrow: <></>,
        },
      },
    ],
  };
  // function ChangeToSlug(title) {
  //   let slug = title.toLowerCase();

  //   slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  //   slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  //   slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  //   slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  //   slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  //   slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  //   slug = slug.replace(/đ/gi, 'd');

  //   slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');

  //   slug = slug.replace(/\s+/g, '-');

  //   slug = slug.replace(/\-\-\-\-\-/gi, '-');
  //   slug = slug.replace(/\-\-\-\-/gi, '-');
  //   slug = slug.replace(/\-\-\-/gi, '-');
  //   slug = slug.replace(/\-\-/gi, '-');
  //   slug = '@' + slug + '@';
  //   slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  //   slug += '-delivery';
  //   return slug;
  // }
  // console.log(data);
  return (
    <div className={cx('list-promo')}>
      <div className={cx()}>
        {data.length > 0 && (
          <div className={cx({ 'list-wrapper': !hasData })}>
            <Slider {...settings}>
              {data.length > 0 &&
                data.map((item, index) => {
                  return (
                    <div key={index} className={cx('item')}>
                      <RestaurantCard
                        className={cx({ 'first-item': index === 0 }, { 'last-item': index === data.length - 1 })}
                        data={item}
                      />
                    </div>
                  );
                })}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ListSlider);
