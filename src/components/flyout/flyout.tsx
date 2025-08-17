import styles from './flyout.module.css';
import { handleDownload } from '../../utils/handleDownload.ts';
import type { Person } from '../../types/person.ts';
import { useTranslations } from 'next-intl';

type Props = {
  selectedPeople: Record<string, Person>;
  clearSelection: () => void;
};

export const Flyout = ({ selectedPeople, clearSelection }: Props) => {
  const t = useTranslations('Flyout');

  return (
    <div className={styles.flyout}>
      <p>
        {Object.keys(selectedPeople).length} {t('personSelected')}
      </p>
      <button onClick={clearSelection}>{t('unselect')}</button>
      <button onClick={() => handleDownload(selectedPeople)}>
        {t('download')}
      </button>
    </div>
  );
};
