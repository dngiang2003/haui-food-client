import classNames from 'classnames/bind';
import styles from './ListCategorise.module.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { getCategories } from '~/apiService/categoryService';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Loader from '../Loader';
import NoResult from '../NoResult';
import InfiniteScroll from 'react-infinite-scroll-component';
const cx = classNames.bind(styles);

function nomalizeString(str) {
  return (
    str
      // .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '-')
  );
}

function ListCategorise() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, listCategories, data } = useSelector((state) => state.category);
  // console.log(data);
  return (
    <div className={cx('list-categorise', 'row', 'gx-xl-2', 'g-0')}>
      <InfiniteScroll
        scrollThreshold="20%"
        className={cx('infinite-scroll row')}
        dataLength={listCategories.length}
        next={() => {
          dispatch(getCategories({ limit: 8, page: currentPage }));
          setCurrentPage((pre) => pre + 1);
        }}
        hasMore={
          currentPage === 1 && !data.totalResult ? true : listCategories.length < data.totalResult ? true : false
        }
      >
        {listCategories.map((item, index) => (
          <Link
            to={`${routes.category.split('/')[0]}/${nomalizeString(item.slug)}`}
            key={index}
            className={cx('col-xl-3 col-6')}
            onClick={() => {
              localStorage.setItem('categorySelected', JSON.stringify({ name: item.name, slug: item.slug }));
              sessionStorage.setItem('idCategorySelected', JSON.stringify(item?._id));
              // dispatch(setCategoryClicked({ name: item.name, slug: item.slug }));
            }}
          >
            <div>
              <div className={cx('list-categorise__item')} key={item._id}>
                <img className={cx('category-img')} src={item.image} alt={item.name} />
                <span className={cx('category-name')}>{item.name}</span>
              </div>
            </div>
          </Link>
        ))}
        {listCategories.length <= 0 && !loading && <NoResult />}
      </InfiniteScroll>
      {loading && (
        <div>
          <Loader className={cx('loader')} />
        </div>
      )}
    </div>
  );
}

export default ListCategorise;
