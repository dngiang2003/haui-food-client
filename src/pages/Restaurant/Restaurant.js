import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import styles from './Restaurant.module.scss';

import RestaurantHeader from '~/components/RestaurantHeader/RestaurantHeader';

const cx = classNames.bind(styles);

const data = [
  {
    restaurantName: 'Xôi Chú Ngọng - Đê La Thành',
    products: 'Bánh Mì - Xôi',
    ratingStar: '4.2',
    time: '2.5 phút',
    distance: '2.1 km',
    openTime: 'Hôm nay 06:00-14:00 17:00-23:00',
    deliveryAddress: ['Địa chỉ giao hàng: Sảnh chính tòa A1', 'P101, Tòa A1', 'P102, Tòa A1', 'P103, Tòa A1'],
    deliveryTime: ['Thời gian giao hàng: Ngay bây giờ', '1:00 - 1:15', '2:00 - 2:15'],
    directories: ['Trà chanh tắc', 'Combo best seller', 'Xôi thịt', 'Bánh mỳ pate', 'Cà phê', 'Trà trái cây'],
    banner:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    productsList: [
      {
        directory: 'Trà chanh tắc',
        products: [
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Mật Ong 500ML',
            description:
              'Trà Chanh Truyền Thống Kết Hợp Cùng Mật Ong Tạo Hương Vị Thanh Mát , Chua Ngọt Vừa Đủ . Gía trên chưa bao gồm topping Khách có thể mua thêm topping ở phần tùy chọn ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Thái Lan 700ML',
            description:
              'Trà Chanh Thái Lan Kết Hợp Trà Lài + Trà Thái Tạo Nên Hương Vị Đặc Trưng , Thanh Mát , Dễ Uống Khách Có Thể Tham Khảo ạ (Gía Trên Chưa Bao Gồm Topping , Khách Có Thể Mua Thêm Topping Trong Phần Tùy Chọn ) ạ',
            price: '20000',
          },

          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
        ],
      },
      {
        directory: 'Trà chanh tắc',
        products: [
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Mật Ong 500ML',
            description:
              'Trà Chanh Truyền Thống Kết Hợp Cùng Mật Ong Tạo Hương Vị Thanh Mát , Chua Ngọt Vừa Đủ . Gía trên chưa bao gồm topping Khách có thể mua thêm topping ở phần tùy chọn ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Thái Lan 700ML',
            description:
              'Trà Chanh Thái Lan Kết Hợp Trà Lài + Trà Thái Tạo Nên Hương Vị Đặc Trưng , Thanh Mát , Dễ Uống Khách Có Thể Tham Khảo ạ (Gía Trên Chưa Bao Gồm Topping , Khách Có Thể Mua Thêm Topping Trong Phần Tùy Chọn ) ạ',
            price: '20000',
          },

          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
        ],
      },
    ],
  },
  {
    restaurantName: 'Mr.Eco Cơm Gạo Lứt - Healthy Meal - Kim Mã',
    products: 'Cơm Chay - Salad Healthy - Đồ Chay,Cơm,Bún - Phở - Cháo',
    ratingStar: '4.5',
    time: '2.5 phút',
    distance: '2.1 km',
    openTime: '09:00-20:30',
    deliveryAddress: ['Ngày giao hàng: Ngày hôm nay', 'P101, Tòa A1', 'P102, Tòa A1', 'P103, Tòa A1'],
    deliveryTime: ['Thời gian giao hàng: Ngay bây giờ'],
    directories: ['Trà chanh tắc', 'Combo best seller', 'Xôi thịt', 'Bánh mỳ pate', 'Cà phê'],
    banner:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    productsList: [
      {
        directory: 'Trà chanh tắc',
        products: [
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Mật Ong 500ML',
            description:
              'Trà Chanh Truyền Thống Kết Hợp Cùng Mật Ong Tạo Hương Vị Thanh Mát , Chua Ngọt Vừa Đủ . Gía trên chưa bao gồm topping Khách có thể mua thêm topping ở phần tùy chọn ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Thái Lan 700ML',
            description:
              'Trà Chanh Thái Lan Kết Hợp Trà Lài + Trà Thái Tạo Nên Hương Vị Đặc Trưng , Thanh Mát , Dễ Uống Khách Có Thể Tham Khảo ạ (Gía Trên Chưa Bao Gồm Topping , Khách Có Thể Mua Thêm Topping Trong Phần Tùy Chọn ) ạ',
            price: '20000',
          },

          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
        ],
      },
    ],
  },
  {
    restaurantName: 'Xóm ăn đêm ',
    products: 'Ăn Vặt,Tráng Miệng,Gà Rán - Burger,Lẩu & Nướng - Quay',
    ratingStar: '4.3',
    time: '25 phút',
    distance: '3,4 km',
    openTime: '00:00-03:00 10:00-23:59',
    deliveryAddress: ['Địa điểm giao hàng: Sảnh chính tòa A1', 'P101, Tòa A1', 'P102, Tòa A1', 'P103, Tòa A1'],
    deliveryTime: ['Thời gian giao hàng: Ngay bây giờ'],
    directories: ['Trà chanh tắc', 'Combo best seller', 'Xôi thịt', 'Bánh mỳ pate', 'Cà phê', 'Trà trái cây'],
    banner:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    productsList: [
      {
        directory: 'Trà chanh tắc',
        products: [
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Mật Ong 500ML',
            description:
              'Trà Chanh Truyền Thống Kết Hợp Cùng Mật Ong Tạo Hương Vị Thanh Mát , Chua Ngọt Vừa Đủ . Gía trên chưa bao gồm topping Khách có thể mua thêm topping ở phần tùy chọn ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Thái Lan 700ML',
            description:
              'Trà Chanh Thái Lan Kết Hợp Trà Lài + Trà Thái Tạo Nên Hương Vị Đặc Trưng , Thanh Mát , Dễ Uống Khách Có Thể Tham Khảo ạ (Gía Trên Chưa Bao Gồm Topping , Khách Có Thể Mua Thêm Topping Trong Phần Tùy Chọn ) ạ',
            price: '20000',
          },

          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
        ],
      },
    ],
  },
  {
    restaurantName: 'mcdonalds Hồ Gươm',
    products: 'Ăn Vặt,Tráng Miệng,Gà Rán - Burger,Lẩu & Nướng - Quay',
    ratingStar: '4.3',
    time: '25 phút',
    distance: '3,4 km',
    openTime: '00:00-03:00 10:00-23:59',
    deliveryAddress: ['Ngày giao hàng: Ngày hôm nay', 'P101, Tòa A1', 'P102, Tòa A1', 'P103, Tòa A1'],
    deliveryTime: ['Thời gian giao hàng: Ngay bây giờ'],
    directories: ['Trà chanh tắc', 'Combo best seller', 'Xôi thịt', 'Bánh mỳ pate', 'Cà phê', 'Trà trái cây'],
    banner:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    productsList: [
      {
        directory: 'Trà chanh tắc',
        products: [
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Mật Ong 500ML',
            description:
              'Trà Chanh Truyền Thống Kết Hợp Cùng Mật Ong Tạo Hương Vị Thanh Mát , Chua Ngọt Vừa Đủ . Gía trên chưa bao gồm topping Khách có thể mua thêm topping ở phần tùy chọn ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Thái Lan 700ML',
            description:
              'Trà Chanh Thái Lan Kết Hợp Trà Lài + Trà Thái Tạo Nên Hương Vị Đặc Trưng , Thanh Mát , Dễ Uống Khách Có Thể Tham Khảo ạ (Gía Trên Chưa Bao Gồm Topping , Khách Có Thể Mua Thêm Topping Trong Phần Tùy Chọn ) ạ',
            price: '20000',
          },

          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
        ],
      },
    ],
  },
];

const Restaurant = () => {
  const [restaurantInfor, setRestaurantInfor] = useState(null);
  const [searchSlug, setSearchSlug] = useState(null);
  const location = useLocation();
  useEffect(() => {
    // Lấy phần cần thiết ra khỏi URL khi location thay đổi
    const pathname = location.pathname;
    const parts = pathname.split('/');
    const slug = parts[parts.length - 1]; // Lấy phần cuối cùng của đường dẫn URL
    setSearchSlug(slug);
  }, [location]);

  useEffect(() => {
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

    const restaurantInformation = data.find((restaurant) => {
      const slug = ChangeToSlug(restaurant.restaurantName);
      return slug === searchSlug;
    });

    if (restaurantInformation) setRestaurantInfor(restaurantInformation);
  }, [searchSlug]);

  const menuItems = restaurantInfor?.productsList.map((directory, index) => {
    return (
      <div key={index} className={cx('productCard')}>
        <h2>{directory.directory}</h2>
        {directory.products.map((product, idx) => {
          return (
            <div key={idx} className={cx('productCard__detail')}>
              <div className={cx('productCard__detail--img')}>
                <img alt="ảnh" src={product.productImage} />
              </div>
              <div className={cx('productCard__detail--description')}>
                <div className={cx('productCard__detail--description--content')}>
                  <div className={cx('productCard__detail--description--content--title')}>{product.productName}</div>
                  <div className={cx('productCard__detail--description--content--describe')}>{product.description}</div>
                </div>
                <div className={cx('productCard__detail--description--price')}>
                  {product.price} <button>{/* <PlusIcon className={cx('plusIcon')} /> */}+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className={cx('restaurant')}>
      <RestaurantHeader restaurant={restaurantInfor} />
      <div className={cx('restaurant__content')}>
        <div className={cx('restaurant__content--products')}>{menuItems}</div>
      </div>

      <p className={cx('restaurant__footer')}>
        Chúng tôi luôn cố gắng cập nhật thông tin chính xác nhất. <a href="#">Hãy báo với chúng tôi </a>nếu bạn thấy bất
        kỳ thông tin không chính xác nào.
      </p>
    </div>
  );
};

export default Restaurant;
