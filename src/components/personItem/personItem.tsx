import styles from '../results/results.module.css';
import classNames from 'classnames';
import Card from '../card/card.tsx';
import type { Person } from '../../types/person.ts';

type Props = {
  id: string;
  isSelected: boolean;
  toggleSelection: () => void;
  openDetails: (id: string) => void;
  person: Person;
};

export const PersonItem = ({
  id,
  isSelected,
  toggleSelection,
  openDetails,
  person,
}: Props) => {
  return (
    <li className={styles.personItem}>
      <label className={styles.personLabel}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={toggleSelection}
        />
        <button
          className={classNames(styles.resetLink, styles.person)}
          onClick={() => openDetails(id)}
        >
          <Card
            name={person.name}
            description={`Height: ${person.height}, Birth year: ${person.birth_year}`}
          />
        </button>
      </label>
    </li>
  );
};
