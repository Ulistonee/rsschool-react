import styles from './pagination.module.css';

type Props = {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ page, hasNext, hasPrev, setPage }: Props) => {
  return (
    <div className={styles.paginationContainer}>
      <button onClick={() => setPage((p) => p - 1)} disabled={!hasPrev}>
        ◀ Prev
      </button>
      <span>Page {page}</span>
      <button onClick={() => setPage((p) => p + 1)} disabled={!hasNext}>
        Next ▶
      </button>
    </div>
  );
};

export default Pagination;
