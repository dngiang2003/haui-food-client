import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import style from './RestaurantList.module.scss';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import Loader from '../Loader';
import NoResult from '../NoResult';
import { getRestaurants, getRestaurantsByCategory } from '~/apiService/restaurantService';
import Skeleton from '../Skeleton';

const cx = classNames.bind(style);

function RestaurantList({ category, type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantList, setRestaurantList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const limit = 8;
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.restaurant);

  useEffect(() => {
    setIsLoading(reduxData.loading);
  }, [reduxData]);

  const fetchRestaurants = async () => {
    if (!query && !category) {
      await dispatch(getRestaurants({ limit: limit, page: currentPage })).then((result) => {
        // console.log(result);
        if (result.payload.code === 200) {
          setTotalPages(result.payload.data.totalPage);
          setTotalDocuments(result.payload.data.totalResult);
          setRestaurantList((preRestaurant) => {
            return [...preRestaurant, ...result.payload.data.shops];
          });

          if (currentPage === result.payload.data.totalPage) {
            setHasMore(false);
            return;
          } else {
            setCurrentPage((pre) => {
              return ++pre;
            });
          }

          // setIsLoading(false);
        }
      });
    } else if (query) {
      await dispatch(getRestaurants({ limit: limit, page: currentPage, keyword: query })).then((result) => {
        if (result.payload.code === 200) {
          // console.log(result);
          if (result.payload.data.totalResult > 0) {
            setTotalPages(result.payload.data.totalPage);
            setTotalDocuments(result.payload.data.totalResult);
            setRestaurantList((preRestaurant) => {
              return [...preRestaurant, ...result.payload.data.shops];
            });

            if (currentPage === result.payload.data.totalPage) {
              setHasMore(false);
              return;
            } else {
              setCurrentPage((pre) => {
                return ++pre;
              });
            }
          } else {
            setHasMore(false);
          }
        }
      });
    } else if (category) {
      const categoryId = JSON.parse(sessionStorage.getItem('idCategorySelected'));
      await dispatch(getRestaurantsByCategory({ categoryId: categoryId })).then((result) => {
        // console.log(result);

        if (result?.payload?.code === 200) {
          setTotalPages(result.payload.data.totalPage);
          setTotalDocuments(result.payload.data.totalResult);
          setRestaurantList((preRestaurant) => {
            return [...preRestaurant, ...result.payload.data.shops];
          });

          if (currentPage === result.payload.data.totalPage) {
            setHasMore(false);
            return;
          } else {
            setCurrentPage((pre) => {
              return ++pre;
            });
          }
        }
      });
    }
  };
  // window.scrollTo(0, 2);
  useEffect(() => {
    // console.log('query change');
    setCurrentPage(1);
    setRestaurantList([]);
    setTotalPages(0);
    setTotalDocuments(0);
    setHasMore(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, type, category]);

  // console.log(query);
  // console.log('currentPage', currentPage);
  // console.log('totalDocuments', totalDocuments);
  // console.log('restaurantList', restaurantList);
  // console.log(hasMore);
  // console.log('');

  return (
    <div className={cx('restaurant-list')}>
      <div>
        <InfiniteScroll
          scrollThreshold="0"
          className={cx('infinite-scroll row')}
          dataLength={restaurantList.length}
          next={() => {
            fetchRestaurants();
            restaurantList.length === 0
              ? setHasMore(true)
              : restaurantList.length < totalDocuments && currentPage < totalPages
              ? setHasMore(true)
              : setHasMore(false);
          }}
          // hasMore={restaurantList.length === totalDocuments ? false : true}
          hasMore={hasMore}
          scrollableTarget="restaurant-list"
        >
          {restaurantList.map((item, index) => {
            return (
              <div key={index} className={cx('col-xl-3 col-6')}>
                <div>
                  <RestaurantCard data={item} className={cx('restaurant-list__item')} />
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
      {!isLoading && restaurantList.length === 0 && <NoResult />}
      {reduxData.loading && restaurantList.length > 0 && <Loader className={cx('list__loader')} />}
      {reduxData.loading && restaurantList.length <= 0 && <Skeleton />}
    </div>
  );
}

export default memo(RestaurantList);
