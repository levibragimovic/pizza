import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage }) => {
  const dispatch = useDispatch();
  const changePage = (e) => {
    dispatch(setCurrentPage(e.selected + 1));
  };

  return (
    <ReactPaginate
      className={styles.root}
      nextLabel=">"
      onPageChange={changePage}
      pageCount={3}
      previousLabel="<"
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
