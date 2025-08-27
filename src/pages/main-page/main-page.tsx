import { useCO2Data } from '../../hooks/useCO2Data.ts';
import { messages } from '../../messages/messages.ts';
import styles from './main-page.module.css';
import { Modal } from '../../components/modal/modal.tsx';
import { useState } from 'react';
import { AdditionalColumns } from '../../components/additional-columns/additional-columns.tsx';

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
      country,
      population: latest?.population ?? 'N/A',
      ISO: countryData.iso_code ?? 'N/A',
      year: latest?.year ?? 'N/A',
      co2: latest?.cement_co2 ?? 'N/A',
      co2_per_capita: latest?.cement_co2_per_capita ?? 'N/A',
      ...latest,
    };
  });

  const [isOpen, setIsOpen] = useState(false);
  const [extraColumns, setExtraColumns] = useState<string[]>([]);

  const availableFields = Object.keys(countries[0] || {}).filter(
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

      <div className={styles.container}>
        <div className={styles.table}>
          {allColumns.map((col) => (
            <div key={col} className={`${styles.cell} ${styles.header}`}>
              {col}
            </div>
          ))}

          {countries.map((country, index) =>
            defaultColumns.map((col) => (
              <div key={`${index}-${col}`} className={styles.cell}>
                {country[col as keyof typeof country]}
              </div>
            ))
          )}
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
