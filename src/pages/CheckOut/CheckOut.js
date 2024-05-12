import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Oval } from '@agney/react-loading';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

import styles from './CheckOut.module.scss';

import Button from '~/components/Button';
import images from '~/assets/images';
import routes from '~/config/routes';
import CartItem from '~/components/CartItem';
import { ArrowDownIcon, InfoIcon, NoteIcon } from '~/components/Icons';
import { displayProductInCart } from '~/apiService/cartService';

const cx = classNames.bind(styles);

function CheckOut() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = localStorage.getItem('accessToken');
  const auth = useSelector((state) => state.auth.isLogin);
  const isLoading = useSelector((state) => state.cart.loading);
  const isAddProduct = useSelector((state) => state.cart.isAddProduct);
  const isDeleteProduct = useSelector((state) => state.cart.isDeleteProduct);
  
  const buildings = ['A1', 'A7', 'A8', 'A9', 'A10', 'A12'];

  const [cartsData, setCartsData] = useState({});
  const [havePower, setHavePower] = useState(false);
  const cartsLength = cartsData.carts ? cartsData.carts.length : 0;
  const cartsTotalMoney = cartsData.totalMoneyAllCarts ? cartsData.totalMoneyAllCarts : 0;

  const [buildingFloors, setBuildingFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);

  // Shopping cart information - start
  const [building, setBuilding] = useState(t('checkout.title04'));
  const [floor, setFloor] = useState(t('checkout.title05'));
  const [classroom, setClassroom] = useState(t('checkout.title07'));
  const [note, setNote] = useState('');
  const [payment, setPayment] = useState('cash');
  // - end

  const [showFloors, setShowFloors] = useState(false);
  const [showBuildings, setShowBuildings] = useState(false);
  const [showClassrooms, setShowClassrooms] = useState(false);
  const [isSelectBuilding, setIsSelectBuilding] = useState(false);
  const [isSelectFloor, setIsSelectFloor] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const floorsRef = useRef(null);
  const buildingsRef = useRef(null);
  const classroomsRef = useRef(null);
  const addressFloorsRef = useRef(null);
  const addressBuildingsRef = useRef(null);
  const addressClassroomsRef = useRef(null);

  const handleClickOutsideFloors = useCallback((event) => {
    if (
      floorsRef.current &&
      !floorsRef.current.contains(event.target) &&
      !addressFloorsRef.current.contains(event.target)
    ) {
      setShowFloors(false);
    }
  }, []);

  const handleClickOutsideBuildings = useCallback((event) => {
    if (
      buildingsRef.current &&
      !buildingsRef.current.contains(event.target) &&
      !addressBuildingsRef.current.contains(event.target)
    ) {
      setShowBuildings(false);
    }
  }, []);

  const handleClickOutsideClassrooms = useCallback((event) => {
    if (
      classroomsRef.current &&
      !classroomsRef.current.contains(event.target) &&
      !addressClassroomsRef.current.contains(event.target)
    ) {
      setShowClassrooms(false);
    }
  }, []);

  const handleBuildingClick = (building) => {
    let floors;
    let roomsPerFloor;

    switch (building) {
      case 'A1':
        floors = Array.from({ length: 15 }, (_, i) => i + 1);
        roomsPerFloor = 4;
        break;
      case 'A7':
        floors = Array.from({ length: 6 }, (_, i) => i + 1);
        roomsPerFloor = 33;
        break;
      case 'A8':
        floors = Array.from({ length: 6 }, (_, i) => i + 1);
        roomsPerFloor = 4;
        break;
      case 'A9':
        floors = Array.from({ length: 6 }, (_, i) => i + 1);
        roomsPerFloor = 9;
        break;
      case 'A10':
        floors = Array.from({ length: 9 }, (_, i) => i + 1);
        roomsPerFloor = 15;
        break;
      case 'A12':
        floors = Array.from({ length: 6 }, (_, i) => i + 1);
        roomsPerFloor = 6;
        break;
      default:
        floors = Array.from({ length: 6 }, (_, i) => i + 1);
        roomsPerFloor = 6;
        break;
    }

    setBuildingFloors(floors);

    // Tạo danh sách phòng học dựa trên số tầng và số phòng mỗi tầng
    const buildingRooms = floors.map((floor) => {
      return Array.from({ length: roomsPerFloor }, (_, i) => floor * 100 + i + 1);
    });
    setRooms(buildingRooms);
  };

  const handleFloorClick = (floor) => {
    setSelectedFloor(floor);
  };

  const handleChange = (event) => {
    setPayment(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideFloors);

    return () => {
      document.removeEventListener('click', handleClickOutsideFloors);
    };
  }, [handleClickOutsideFloors]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideBuildings);

    return () => {
      document.removeEventListener('click', handleClickOutsideBuildings);
    };
  }, [handleClickOutsideBuildings]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideClassrooms);

    return () => {
      document.removeEventListener('click', handleClickOutsideClassrooms);
    };
  }, [handleClickOutsideClassrooms]);

  useEffect(() => {
    if (building !== t('checkout.title04')) {
      setIsSelectBuilding(true);
    } else {
      setIsSelectBuilding(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [building]);

  useEffect(() => {
    if (floor !== t('checkout.title05')) {
      setIsSelectFloor(true);
    } else {
      setIsSelectFloor(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floor]);

  useEffect(() => {
    if (building !== t('checkout.title04') && floor !== t('checkout.title05') && classroom !== t('checkout.title07')) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [building, floor, classroom]);

  useEffect(() => {
    dispatch(displayProductInCart()).then((result) => {
      if (result.payload.code === 200) {
        setCartsData(result.payload.data);
        setHavePower(true);
      } else {
        toast.warning(result.payload.message);
        setHavePower(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddProduct, isDeleteProduct]);

  useEffect(() => {
    const disableScroll = (event) => {
      event.preventDefault();
    };

    if (isLoading) {
      window.addEventListener('wheel', disableScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', disableScroll);
    }

    return () => {
      window.removeEventListener('wheel', disableScroll);
    };
  }, [isLoading]);

  return (
    <div className={cx('checkout')}>
      {(auth || token) && havePower && cartsLength > 0 && (
        <>
          <div className={cx('checkout__top')}>
            <div className={cx('container gx-5')}>
              <div className={cx('checkout__info')}>
                <div>
                  <h1 className={cx('checkout__heading')}>{t('checkout.heading')}</h1>
                  <h4 className={cx('checkout__name')}>
                    {cartsData.carts
                      ? cartsData.carts.map((cartItem, index) => {
                          if (index === cartsData.carts.length - 1) {
                            return cartItem.shop.fullname;
                          }
                          return `${cartItem.shop.fullname}, `;
                        })
                      : ' '}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className={cx('container gx-5')}>
            <div className={cx('row gx-4 gx-xxl-5')}>
              <div className={cx('col-12 col-xxl-8 col-xl-8 col-lg-8 col-md-12')}>
                <div className={cx('checkout__group')}>
                  <h4 className={cx('checkout__group-title')}>{t('checkout.title01')}</h4>
                  <div
                    className={cx('separate')}
                    style={{ '--separate-bg': '#d1d3d6', '--separate-mg': '12px 0 20px' }}
                  ></div>

                  <div className={cx('delivery-time')}>
                    <span className={cx('delivery-time__title')}>{t('checkout.title02')}</span>
                    <span className={cx('delivery-time__value')}> 10 - 15 {t('cart.desc05')}</span>
                  </div>
                  <div
                    className={cx('separate')}
                    style={{ '--separate-bg': '#d1d3d6', '--separate-mg': '20px 0' }}
                  ></div>

                  <div className={cx('address')}>
                    <span className={cx('address__title')}>{t('checkout.title03')}</span>
                    <div className={cx('address__group')}>
                      {/* Buildings */}
                      <div
                        ref={addressBuildingsRef}
                        onClick={() => setShowBuildings(!showBuildings)}
                        className={cx('address__building', showBuildings && 'address__building--dropdown')}
                      >
                        <span className={cx(showBuildings && 'address__building-title')}>{building}</span>
                        <ArrowDownIcon className={cx('address__arrow', showBuildings && 'address__arrow--show')} />
                        <ul
                          ref={buildingsRef}
                          className={cx('address__building-list', showBuildings && 'address__building--show')}
                        >
                          {buildings.map((buildingItem, index) => (
                            <li
                              onClick={() => {
                                setBuilding(`${t('checkout.title06')} ${buildingItem}`);
                                handleBuildingClick(buildingItem);
                                if (building !== t('checkout.title04')) {
                                  setFloor(t('checkout.title05'));
                                  setClassroom(t('checkout.title07'));
                                  if (floorsRef.current) {
                                    floorsRef.current.scrollTop = 0;
                                  }
                                }
                              }}
                              key={index}
                              className={cx('address__building-item')}
                            >
                              {`${t('checkout.title06')} ${buildingItem}`}
                              {building === `${t('checkout.title06')} ${buildingItem}` && (
                                <span className={cx('address__building-checked')}></span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Floors */}
                      <div
                        ref={addressFloorsRef}
                        onClick={() => {
                          if (isSelectBuilding) {
                            setShowFloors(!showFloors);
                          } else {
                            toast.info(t('checkout.notify01'));
                          }
                        }}
                        style={!isSelectBuilding ? { opacity: '0.6', cursor: 'no-drop' } : {}}
                        className={cx('address__floor', showFloors && 'address__floor--dropdown')}
                      >
                        <span className={cx(showFloors && 'address__floor-title')}>{floor}</span>
                        <ArrowDownIcon className={cx('address__arrow', showFloors && 'address__arrow--show')} />
                        <ul ref={floorsRef} className={cx('address__floor-list', showFloors && 'address__floor--show')}>
                          {buildingFloors.map((floorItem, index) => (
                            <li
                              onClick={() => {
                                setFloor(`${t('checkout.title05')} ${floorItem}`);
                                handleFloorClick(floorItem);
                                if (floor !== t('checkout.title05')) {
                                  setClassroom(t('checkout.title07'));
                                  if (classroomsRef.current) {
                                    classroomsRef.current.scrollTop = 0;
                                  }
                                }
                              }}
                              key={index}
                              className={cx('address__floor-item')}
                            >
                              {`${t('checkout.title05')} ${floorItem}`}
                              {floor === `${t('checkout.title05')} ${floorItem}` && (
                                <span className={cx('address__floor-checked')}></span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Classrooms */}
                      <div
                        ref={addressClassroomsRef}
                        onClick={() => {
                          if (isSelectFloor) {
                            setShowClassrooms(!showClassrooms);
                          } else {
                            toast.info(t('checkout.notify02'));
                          }
                        }}
                        style={!isSelectFloor ? { opacity: '0.6', cursor: 'no-drop' } : {}}
                        className={cx('address__classroom', showClassrooms && 'address__classroom--dropdown')}
                      >
                        <span className={cx(showClassrooms && 'address__classroom-title')}>{classroom}</span>
                        <ArrowDownIcon className={cx('address__arrow', showClassrooms && 'address__arrow--show')} />
                        <ul
                          ref={classroomsRef}
                          className={cx('address__classroom-list', showClassrooms && 'address__classroom--show')}
                        >
                          {(rooms[selectedFloor - 1] || []).map((roomItem, index) => (
                            <li
                              onClick={() => setClassroom(`${t('checkout.title14')} ${roomItem}`)}
                              key={index}
                              className={cx('address__classroom-item')}
                            >
                              {`${t('checkout.title14')} ${roomItem}`}
                              {classroom === `${t('checkout.title14')} ${roomItem}` && (
                                <span className={cx('address__classroom-checked')}></span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Note */}
                    <span className={cx('address__title', 'address__title-detail')}>{t('checkout.title08')}</span>
                    <div className={cx('address__group')}>
                      <div className={cx('form__text-input', 'form__text-input--sm', 'address__detail-input')}>
                        <input
                          onChange={(e) => setNote(e.target.value)}
                          type="text"
                          name="address-detail"
                          placeholder={t('checkout.desc01')}
                          className={cx('form__input')}
                        />
                        <NoteIcon className={cx('form__input-icon')} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products list */}
                <div className={cx('checkout__group')}>
                  <h4 className={cx('checkout__group-title')}>{t('checkout.title09')}</h4>
                  <div
                    className={cx('separate')}
                    style={{ '--separate-bg': '#d1d3d6', '--separate-mg': '12px 0 20px' }}
                  ></div>

                  <div className={cx('checkout__carts')}>
                    {cartsData.carts &&
                      cartsData.carts.map((cartItem, index) => {
                        return (
                          <div key={index} className={cx('cart__products')}>
                            <div className={cx('cart__products-top')}>
                              <Link to={'#!'}>
                                <h5 className={cx('cart__products-heading')}>{cartItem.shop.fullname}</h5>
                              </Link>
                              <button className={cx('cart__products-delete-all')}>{t('button.btn04')}</button>
                            </div>
                            <div className={cx('cart__products-list')}>
                              {cartItem.cartDetails.map((cartDetail, index) => (
                                <CartItem key={index} data={cartDetail} isCheckout />
                              ))}
                            </div>
                            <div className={cx('cart__summary')}>
                              <div className={cx('cart__summary-info')}>
                                <span className={cx('cart__summary-price')}>{t('cart.desc03')}</span>
                                <span className={cx('cart__summary-price')}>
                                  {cartItem.totalMoney.toLocaleString('vi-VN')} ₫
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className={cx('checkout__total')}>
                    <div className={cx('checkout__total-group')}>
                      <h6 className={cx('checkout__total-title')}>{t('checkout.title10')}</h6>
                      <h6 className={cx('checkout__total-value')}>
                        {cartsTotalMoney && `${cartsTotalMoney.toLocaleString('vi-VN')} ₫`}
                      </h6>
                    </div>
                    <div className={cx('checkout__total-group')}>
                      <h6 className={cx('checkout__total-title')}>
                        {t('checkout.title13')} <InfoIcon />
                      </h6>
                      <h6 className={cx('checkout__total-value')}>10.000 ₫</h6>
                    </div>
                  </div>
                </div>

                {/* Payment detail */}
                <div className={cx('checkout__group')}>
                  <h4 className={cx('checkout__group-title')}>{t('checkout.title11')}</h4>
                  <div
                    className={cx('separate')}
                    style={{ '--separate-bg': '#d1d3d6', '--separate-mg': '12px 0 20px' }}
                  ></div>

                  <div className={cx('checkout__payment')}>
                    <FormControl component="fieldset" style={{ fontFamily: 'var(--font-family)' }}>
                      <FormLabel component="legend" className="checkout__pay-title">
                        {t('checkout.title12')}
                      </FormLabel>
                      <RadioGroup
                        aria-label="payment-method"
                        defaultValue="cash"
                        name="radio-buttons-group"
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="cash"
                          control={<Radio className="radio-button" />}
                          label={t('checkout.desc02')}
                          className="radio-label"
                        />
                        <FormControlLabel
                          value="banking"
                          control={<Radio className="radio-button" />}
                          label={t('checkout.desc03')}
                          className="radio-label"
                        />
                      </RadioGroup>
                    </FormControl>

                    <div className={cx('checkout__payment-qr')}>
                      <p className={cx('checkout__payment-desc')}>{t('checkout.desc04')}</p>
                      <img src={images.qrPay} className={cx('checkout__payment-thumb')} alt="qr" />
                    </div>
                  </div>
                </div>

                <div className={cx('checkout__group')}>
                  <div className={cx('checkout__bottom')}>
                    <div className={cx('checkout__bottom-img')}>
                      <div className={cx('checkout__bottom-thumb')}></div>
                    </div>
                    <div className={cx('checkout__bottom-info')}>
                      <p className={cx('checkout__bottom-desc')}>{t('checkout.desc05')}</p>
                      <div className={cx('checkout__bottom-pays')}>
                        <img src={images.bank} className={cx('checkout__bottom-pay')} alt="bank-transfer" />
                        <img src={images.cash} className={cx('checkout__bottom-pay')} alt="cash" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={cx('col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-12')}>
                <div className={cx('checkout__right')}>
                  <div className={cx('checkout__right-info')}>
                    <h4 className={cx('checkout__right-title')}>{t('cart.desc03')}</h4>
                    <span className={cx('checkout__right-cost')}>
                      {cartsTotalMoney && `${(cartsTotalMoney + 10000).toLocaleString('vi-VN')} ₫`}
                    </span>
                  </div>
                  <Button disabled={!isSubmit} order primary>
                    {t('button.btn16')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {((!auth && !token) || !havePower || cartsLength <= 0) && (
        <div className={cx('no-products')}>
          <img src={images.cart} alt="cart" className={cx('no-products__thumb')} />
          <div className={cx('no-products__info')}>
            <h4 className={cx('no-products__title')}>{t('checkout.title15')}</h4>
            <p className={cx('no-products__desc')}>{t('checkout.desc06')}</p>
            <Link to={routes.restaurant} className={cx('no-products__link')}>
              {t('checkout.link01')}
            </Link>
          </div>
        </div>
      )}

      {isLoading && (
        <div className={cx('modal-loading')}>
          <div className={cx('modal-loading__content')}>
            <Oval width="50" color="#00b14f" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
