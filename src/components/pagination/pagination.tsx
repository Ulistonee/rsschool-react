import styles from './pagination.module.css';

type Props = {
  pageNumber: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
};

const Pagination = ({
  pageNumber,
  hasNext,
  hasPrev,
  onPrevPage,
  onNextPage,
}: Props) => {
  return (
    <div className={styles.paginationContainer}>
      <button onClick={onPrevPage} disabled={!hasPrev}>
        ◀ Prev
      </button>
      <span>Page {pageNumber}</span>
      <button onClick={onNextPage} disabled={!hasNext}>
        Next ▶
      </button>
    </div>
  );
};

export default Pagination;
