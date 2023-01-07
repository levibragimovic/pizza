import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {
  const dispatch = useDispatch();
  const changePage = (e: any) => {
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
