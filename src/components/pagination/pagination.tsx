import styles from './pagination.module.css';

type Props = {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
};

const Pagination = ({
  page,
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
      <span>Page {page}</span>
      <button onClick={onNextPage} disabled={!hasNext}>
        Next ▶
      </button>
    </div>
  );
};

export default Pagination;
