import styles from './flyout.module.css';
import { handleDownload } from '../../utils/handleDownload.ts';
import type { Person } from '../../types/person.ts';

type Props = {
  selectedPeople: Record<string, Person>;
  clearSelection: () => void;
};

export const Flyout = ({ selectedPeople, clearSelection }: Props) => {
  return (
    <div className={styles.flyout}>
      <p>{Object.keys(selectedPeople).length} person selected</p>
      <button onClick={clearSelection}>Unselect all</button>
      <button onClick={() => handleDownload(selectedPeople)}>Download</button>
    </div>
  );
};
