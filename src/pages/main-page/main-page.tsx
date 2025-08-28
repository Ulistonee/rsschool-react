import { useCO2Data } from '../../hooks/useCO2Data.ts';
import { messages } from '../../messages/messages.ts';
import styles from './main-page.module.css';
import { Modal } from '../../components/modal/modal.tsx';
import { useState } from 'react';
import { AdditionalColumns } from '../../components/additional-columns/additional-columns.tsx';
import * as React from 'react';
import { formatValue } from '../../utils/formatValue.ts';
import { defaultColumns } from '../../constants/constants.ts';
import { filterByLatestYear } from '../../utils/filterByLatestYear.ts';
import { getAdditionalFields } from '../../utils/getAdditionalFields.ts';

export const MainPage = () => {
  const data = useCO2Data();

  const countries = filterByLatestYear(data);

  const [isOpen, setIsOpen] = useState(false);
  const [extraColumns, setExtraColumns] = useState<string[]>([]);

  const additionalFields = getAdditionalFields(countries);

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
          availableFields={additionalFields}
          selected={extraColumns}
          onChange={setExtraColumns}
          onSave={() => handleSave(extraColumns)}
        />
      </Modal>
    </>
  );
};
