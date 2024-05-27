import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import ReactPaginate from 'react-paginate';

import style from './ListResult.module.scss';

// import { ChevronRight } from '../Icons';
import NoResult from '../NoResult';
import ProductCard from '../ProductCard';
import RestaurantCard from '../RestaurantCard/RestaurantCard';

const cx = classNames.bind(style);

function ListResult({ data, className, onChangePage }) {
  // const dispatch = useDispatch();
  const { t } = useTranslation();
  const reduxData = useSelector((prop) => prop.product);
  if (reduxData?.shops.length === 0 && reduxData?.products.length === 0 && !reduxData.loading) {
    return <NoResult />;
  }

  // const handlePageChange = (event) => {
  //   onChangePage(event.selected + 1);
  // };

  return (
    <div className={cx('list')}>
      <h2 className={cx('list-title')}>{t('list-result.list-products')}</h2>
      {reduxData.products.length !== 0 ? (
        <div className={cx('list-container')}>
          <div className={cx('row g-5 g-0')}>
            {reduxData?.products.map((item, index) => {
              return (
                <div key={index} className={cx('col-xl-4 col-12')}>
                  <ProductCard data={item} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <NoResult type="product" />
      )}
      <h2 className={cx('list-title')}>{t('list-result.list-restaurants')}</h2>
      {reduxData.shops.length !== 0 ? (
        <div className={cx('list-container')}>
          <div className={cx('row g-5 g-0')}>
            {reduxData?.shops.map((item, index) => {
              return (
                <div key={index} className={cx('col-xl-3 col-6')}>
                  <RestaurantCard data={item} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <NoResult />
      )}

      {/* <div className={cx('pagination-container')}>
        <ReactPaginate
          previousLabel={<ChevronRight className={cx('prev-icon')} />}
          nextLabel={<ChevronRight className={cx('next-icon')} />}
          pageClassName={cx('page-item')}
          pageLinkClassName={cx('page-item-link')}
          previousClassName={cx('page-item')}
          previousLinkClassName={cx('page-item-link')}
          nextClassName={cx('page-item')}
          nextLinkClassName={cx('page-item-link')}
          breakLabel="..."
          breakClassName={cx('page-item')}
          breakLinkClassName={cx('page-item-link')}
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          containerClassName={cx('pagination')}
          activeClassName={cx('page-item-active')}
          forcePage={+(data.currentPage - 1)}
          onPageChange={handlePageChange}
        />
      </div> */}
    </div>
  );
}

export default ListResult;
