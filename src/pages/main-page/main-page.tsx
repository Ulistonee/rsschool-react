import { useCO2Data } from '../../hooks/useCO2Data.ts';
import { messages } from '../../messages/messages.ts';
import styles from './main-page.module.css';
import { Modal } from '../../components/modal/modal.tsx';
import { useCallback, useMemo, useState } from 'react';
import { AdditionalColumns } from '../../components/additional-columns/additional-columns.tsx';
import * as React from 'react';
import { defaultColumns } from '../../constants/constants.ts';
import { filterByYear } from '../../utils/filterByYear.ts';
import { getAdditionalFields } from '../../utils/getAdditionalFields.ts';
import { getAvailableYears } from '../../utils/getAvailableYears.ts';
import { sortCountries } from '../../utils/sortCountries.ts';
import { SearchBar } from '../../components/search-bar/search-bar.tsx';
import { Headers } from '../../components/headers/headers.tsx';
import { CountryInfo } from '../../components/country-info/country-info.tsx';

export const MainPage = () => {
  const data = useCO2Data();
  const allYears = useMemo(() => getAvailableYears(data), [data]);

  const [isOpen, setIsOpen] = useState(false);
  const [extraColumns, setExtraColumns] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState(allYears[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const countries = useMemo(
    () => filterByYear(data, selectedYear),
    [data, selectedYear]
  );
  const additionalFields = getAdditionalFields(countries);
  const allColumns = [...defaultColumns, ...extraColumns];

  const filteredCountries = useMemo(
    () =>
      countries.filter((country) =>
        country.country.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [countries, searchTerm]
  );

  const sortedCountries = useMemo(
    () => sortCountries(filteredCountries, sortKey, sortOrder),
    [filteredCountries, sortKey, sortOrder]
  );

  const handleSave = useCallback((cols: string[]) => {
    setExtraColumns(cols);
    setIsOpen(false);
  }, []);
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(Number(e.target.value));
    },
    []
  );
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return (
    <>
      <h2 className={styles.heading}>{messages.textContent.mainPageTitle}</h2>

      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.table}
            style={{ '--cols': allColumns.length } as React.CSSProperties}
          >
            <Headers
              allColumns={allColumns}
              selectedYear={selectedYear}
              handleYearChange={handleYearChange}
              allYears={allYears}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
              sortKey={sortKey}
              sortOrder={sortOrder}
            />
            <CountryInfo
              sortedCountries={sortedCountries}
              allColumns={allColumns}
              selectedYear={selectedYear}
            />
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
