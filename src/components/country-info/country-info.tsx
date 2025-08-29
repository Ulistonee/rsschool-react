import { formatValue } from '../../utils/formatValue.ts';
import styles from '../../pages/main-page/main-page.module.css';
import type { CountryRow } from '../../utils/filterByYear.ts';

type Props = {
  sortedCountries: CountryRow[];
  allColumns: string[];
  selectedYear: number;
};

export const CountryInfo = ({
  sortedCountries,
  allColumns,
  selectedYear,
}: Props) => {
  return (
    <>
      {sortedCountries.map((country, index) =>
        allColumns.map((col) => {
          const rawValue = country[col as keyof typeof country];
          const value = formatValue(col, rawValue);

          return (
            <div
              key={`${index}-${col}-${selectedYear}`}
              className={`${styles.cell} ${value === 'N/A' ? styles.na : ''}`}
            >
              {value}
            </div>
          );
        })
      )}
    </>
  );
};
