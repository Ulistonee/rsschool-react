import styles from './pagination.module.css';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Pagination');

  return (
    <div className={styles.paginationContainer}>
      <button onClick={onPrevPage} disabled={!hasPrev}>
        ◀ {t('previous')}
      </button>
      <span>
        {t('page')} {pageNumber}
      </span>
      <button onClick={onNextPage} disabled={!hasNext}>
        {t('next')} ▶
      </button>
    </div>
  );
};

export default Pagination;
