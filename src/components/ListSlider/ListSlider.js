import classNames from 'classnames/bind';
import styles from './ListSlider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from '~/components/ProductCard/ProductCard';
import Slider from 'react-slick';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurants } from '~/apiService/restaurantService';

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

// const data = [
//   {
//     image:
//       'https://food-cms.grab.com/compressed_webp/merchants/5-C4EKLZN2CBEUUE/hero/faff5dbaf7024a2c98f33303920f8ef1_1688956019240286277.webp',

//     name: 'Xôi Chú Ngọng - Đê La Thành',
//     categorise: 'Bánh Mì - Xôi',
//     rating: 4.5,
//     discount: 'ƯU đãi đến 10k',
//   },
//   {
//     image:
//       'https://food-cms.grab.com/compressed_webp/merchants/VNGFVN000006ic/hero/24fbc54429f749338dee3df63eeec532_1709525928028380920.webp',
//     name: "McDonald's - Hồ Gươm",
//     categorise: 'Gà rán-Burger, đồ ăn quốc tế',
//     rating: 2.5,
//     discount: 'Ưu đãi đến 15k',
//   },
//   {
//     image:
//       'https://food-cms.grab.com/compressed_webp/merchants/5-C4CEPAAEL4CJJA/hero/782d2085-530e-48fa-9fa2-f392d8f54a4f__store_cover__2023__08__01__06__31__39.webp',
//     name: 'Quán Cơm Rang 1989 - Cơm Rang Văn Phòng',
//     categorise: 'cơm',
//     rating: 3,
//     discount: 'Ưu đãi đến 25k',
//   },
//   {
//     image:
//       'https://food-cms.grab.com/compressed_webp/merchants/5-C2WXPA4DUGBXLT/hero/6a6aca09-adbb-4a42-95d9-1b774c5a0d85__store_cover__2023__09__27__14__59__26.webp',

//     name: 'Gimbap PingPong',
//     categorise: 'Món Quốc Tế',
//     rating: 5,
//     discount: 'Ưu đãi đến 55k',
//   },
//   {
//     image:
//       'https://food-cms.grab.com/compressed_webp/merchants/5-C4EGNT6GRU4XJN/hero/a633f82f-14ca-479b-9301-993145ac7c3c__store_cover__2023__08__02__20__56__41.webp',

//     name: 'A đây rồi - Spaghetti & Salad',
//     categorise: 'Món quốc tế, Salad Heathy - Đồ Chay',
//     rating: 5,
//     discount: 'Ưu đãi đến 55k',
//   },
// ];

function ListPromo() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurants({ limit: 5, page: 1 })).then((result) => {
      if (result.payload.code === 200) {
        // console.log(result.payload);
        setData(result.payload.data.shops);
      }
    });
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
  function ChangeToSlug(title) {
    let slug = title.toLowerCase();

    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');

    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');

    slug = slug.replace(/\s+/g, '-');

    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    slug += '-delivery';
    return slug;
  }
  // console.log(data);
  return (
    <div className={cx('list-promo')}>
      <div className={cx()}>
        <div className={cx()}>
          <Slider {...settings}>
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <a
                    href={`/restaurant/${ChangeToSlug(item?.fullname ? item.fullname : '')}`}
                    key={index}
                    className={cx('item')}
                  >
                    <ProductCard
                      className={cx({ 'first-item': index === 0 }, { 'last-item': index === data.length - 1 })}
                      data={item}
                    />
                  </a>
                );
              })}

          </Slider>
        </div>
      </div>
    </div>
  );
}

export default memo(ListPromo);
