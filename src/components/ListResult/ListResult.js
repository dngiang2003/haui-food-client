import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
// import ReactPaginate from 'react-paginate';

import style from './ListResult.module.scss';

// import { ChevronRight } from '../Icons';
import NoResult from '../NoResult';
import ProductCard from '../ProductCard';

const cx = classNames.bind(style);

function ListResult({ data, className, onChangePage }) {
  // const dispatch = useDispatch();
  const reduxData = useSelector((prop) => prop.product);

  if (data.length === 0 && !reduxData.loading) {
    return <NoResult />;
  }

  // const handlePageChange = (event) => {
  //   onChangePage(event.selected + 1);
  // };

  return (
    <div className={cx('list')}>
      {data && (
        <div className={cx('list-container')}>
          <div className={cx('row g-5 g-0')}>
            {data.map((item, index) => {
              return (
                <div key={index} className={cx('col-xl-4 col-12')}>
                  <ProductCard data={item} />
                </div>
              );
            })}
          </div>
        </div>
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
