import classNames from 'classnames/bind';
import style from './ListResult.module.scss';

// import ReactPaginate from 'react-paginate';
// import { ChevronRight } from '../Icons';
import NoResult from '../NoResult';

import { useDispatch, useSelector } from 'react-redux';
const cx = classNames.bind(style);

function ListResult({ data, className, onChangePage }) {
  // console.log('data list', data);

  // console.log(data);
  // const dispatch = useDispatch();
  const reduxData = useSelector((prop) => prop.product);
  console.log(reduxData);

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
                  <div className={cx('item__wrapper')}>
                    <div className={cx('item__img-container')}>
                      <img className={cx('item__img')} src={item?.image} alt={item?.name} />
                    </div>

                    <div className={cx('item__info')}>
                      <div className={cx('item__name')}>{item?.name}</div>
                      <div className={cx('item__desc')}>{item?.description}</div>
                      <div className={cx('item__last-row')}>
                        <div className={cx('item__price')}>{item?.price}</div>
                        <div className={cx('item__add-cart-btn')}></div>
                      </div>
                    </div>
                  </div>
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
