import { formatValue } from '../../utils/formatValue.ts';
import styles from './country-info.module.css';
import type { CountryRow } from '../../utils/filterByYear.ts';
import * as React from 'react';

type Props = {
  sortedCountries: CountryRow[];
  allColumns: string[];
  selectedYear: number;
};

const CountryInfoComponent = ({
  sortedCountries,
  allColumns,
  selectedYear,
}: Props) => {
  return (
    <>
      {sortedCountries.map((country) =>
        allColumns.map((col) => {
          const rawValue = country[col as keyof typeof country];
          const value = formatValue(col, rawValue);

          return (
            <div
              key={`${country.ISO}-${col}-${selectedYear}`}
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

CountryInfoComponent.displayName = 'CountryInfo';

export const CountryInfo = React.memo(CountryInfoComponent);
