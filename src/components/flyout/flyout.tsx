'use client';

import styles from './flyout.module.css';
import type { Person } from '../../types/person.ts';
import { useTranslations } from 'next-intl';
import { generateCsv } from '../../app/actions/export.ts';
import { saveAs } from 'file-saver';

type Props = {
  selectedPeople: Record<string, Person>;
  clearSelection: () => void;
};

export const Flyout = ({ selectedPeople, clearSelection }: Props) => {
  const t = useTranslations('Flyout');
  const length = Object.keys(selectedPeople)?.length;

  const handleClick = async (selectedPeople: Record<string, Person>) => {
    const blob = await generateCsv(selectedPeople);
    const fileName = `${length}_person.csv`;
    saveAs(blob, fileName);
  };

  return (
    <div className={styles.flyout}>
      <p>
        {Object.keys(selectedPeople).length} {t('personSelected')}
      </p>
      <button onClick={clearSelection}>{t('unselect')}</button>
      <button onClick={() => handleClick(selectedPeople)}>
        {t('download')}
      </button>
    </div>
  );
};
