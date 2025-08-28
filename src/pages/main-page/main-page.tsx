import { useCO2Data } from '../../hooks/useCO2Data.ts';
import { messages } from '../../messages/messages.ts';
import styles from './main-page.module.css';
import { Modal } from '../../components/modal/modal.tsx';
import { useState } from 'react';
import { AdditionalColumns } from '../../components/additional-columns/additional-columns.tsx';
import * as React from 'react';
import { formatValue } from '../../utils/formatValue.ts';

export const MainPage = () => {
  const data = useCO2Data();
  const defaultColumns = [
    'country',
    'population',
    'ISO',
    'year',
    'co2',
    'co2_per_capita',
  ];

  const countries = Object.entries(data).map(([country, countryData]) => {
    const latest = countryData.data[countryData.data.length - 1];

    return {
      ...latest,
      country,
      population: latest?.population,
      ISO: countryData.iso_code,
      last_year: latest?.year,
      co2: latest?.cement_co2,
      co2_per_capita: latest?.cement_co2_per_capita,
    };
  });

  const [isOpen, setIsOpen] = useState(false);
  const [extraColumns, setExtraColumns] = useState<string[]>([]);

  const allKeys = Array.from(
    new Set(countries.flatMap((country) => Object.keys(country)))
  );

  const availableFields = allKeys.filter(
    (key) => !defaultColumns.includes(key)
  );

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

  const allColumns = [...defaultColumns, ...extraColumns];

  return (
    <>
      <h2 className={styles.heading}>{messages.textContent.mainPageTitle}</h2>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.table}
            style={{ '--cols': allColumns.length } as React.CSSProperties}
          >
            {allColumns.map((col) => (
              <div key={col} className={`${styles.cell} ${styles.header}`}>
                {col}
              </div>
            ))}

            {countries.map((country, index) =>
              allColumns.map((col) => {
                const rawValue = country[col as keyof typeof country];
                const value = formatValue(col, rawValue);

                return (
                  <div
                    key={`${index}-${col}`}
                    className={`${styles.cell} ${value === 'N/A' ? styles.na : ''}`}
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
          availableFields={availableFields}
          selected={extraColumns}
          onChange={setExtraColumns}
          onSave={() => handleSave(extraColumns)}
        />
      </Modal>
    </>
  );
};
