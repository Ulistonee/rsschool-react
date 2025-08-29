import styles from '../../pages/main-page/main-page.module.css';

type Props = {
  allColumns: string[];
  selectedYear: number;
  handleYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  allYears: number[];
  setSortKey: (key: 'name' | 'population') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  sortKey: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
};

export const Headers = ({
  allColumns,
  selectedYear,
  handleYearChange,
  allYears,
  setSortKey,
  setSortOrder,
  sortKey,
  sortOrder,
}: Props) => {
  return (
    <>
      {allColumns.map((col) => {
        if (col === 'year') {
          return (
            <div
              key={col}
              className={`${styles.cell} ${styles.header} ${styles.yearSelect}`}
            >
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className={styles.yearSelect}
              >
                {allYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (col === 'country') {
          return (
            <div
              key={col}
              className={`${styles.cell} ${styles.header} ${styles.sortable}`}
              onClick={() => {
                setSortKey('name');
                setSortOrder(
                  sortKey === 'name' && sortOrder === 'asc' ? 'desc' : 'asc'
                );
              }}
            >
              Country{' '}
              {sortKey === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </div>
          );
        }

        if (col === 'population') {
          return (
            <div
              key={col}
              className={`${styles.cell} ${styles.header} ${styles.sortable}`}
              onClick={() => {
                setSortKey('population');
                setSortOrder(
                  sortKey === 'population' && sortOrder === 'asc'
                    ? 'desc'
                    : 'asc'
                );
              }}
            >
              Population{' '}
              {sortKey === 'population'
                ? sortOrder === 'asc'
                  ? '↑'
                  : '↓'
                : ''}
            </div>
          );
        }

        return (
          <div key={col} className={`${styles.cell} ${styles.header}`}>
            {col}
          </div>
        );
      })}
    </>
  );
};
