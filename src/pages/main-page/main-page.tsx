import { useCO2Data } from '../../hooks/useCO2Data.ts';
import { messages } from '../../messages/messages.ts';
import styles from './main-page.module.css';
import { Modal } from '../../components/modal/modal.tsx';
import { useMemo, useState } from 'react';
import { AdditionalColumns } from '../../components/additional-columns/additional-columns.tsx';
import * as React from 'react';
import { formatValue } from '../../utils/formatValue.ts';
import { defaultColumns } from '../../constants/constants.ts';
import { filterByYear } from '../../utils/filterByYear.ts';
import { getAdditionalFields } from '../../utils/getAdditionalFields.ts';
import { getAvailableYears } from '../../utils/getAvailableYears.ts';
import { sortCountries } from '../../utils/sortCountries.ts';
import { SearchBar } from '../../components/search-bar/search-bar.tsx';

export const MainPage = () => {
  const data = useCO2Data();
  const allYears = useMemo(() => getAvailableYears(data), [data]);

  const [isOpen, setIsOpen] = useState(false);
  const [extraColumns, setExtraColumns] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState(allYears[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const countries = filterByYear(data, selectedYear);
  const additionalFields = getAdditionalFields(countries);
  const allColumns = [...defaultColumns, ...extraColumns];

  const filteredCountries = countries.filter((country) =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCountries = sortCountries(filteredCountries, sortKey, sortOrder);

  const handleSave = (cols: string[]) => {
    setExtraColumns(cols);
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
  };

  return (
    <>
      <h2 className={styles.heading}>{messages.textContent.mainPageTitle}</h2>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.table}
            style={{ '--cols': allColumns.length } as React.CSSProperties}
          >
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
                        sortKey === 'name' && sortOrder === 'asc'
                          ? 'desc'
                          : 'asc'
                      );
                    }}
                  >
                    Country{' '}
                    {sortKey === 'name'
                      ? sortOrder === 'asc'
                        ? '↑'
                        : '↓'
                      : ''}
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

            {sortedCountries.map((country, index) =>
              allColumns.map((col) => {
                const rawValue = country[col as keyof typeof country];
                const value = formatValue(col, rawValue);

                return (
                  <div
                    key={`${index}-${col}-${selectedYear}`}
                    className={`${styles.cell} ${
                      value === 'N/A' ? styles.na : ''
                    }`}
                  >
                    {value}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <button onClick={openModal}>+</button>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <AdditionalColumns
          availableFields={additionalFields}
          selected={extraColumns}
          onChange={setExtraColumns}
          onSave={() => handleSave(extraColumns)}
        />
      </Modal>
    </>
  );
};
