import { messages } from '../../messages/messages.ts';
import styles from './additional-columnts.module.css';

type Props = {
  availableFields: string[];
  selected: string[];
  onChange: (cols: string[]) => void;
  onSave: () => void;
};

export const AdditionalColumns = ({
  availableFields,
  selected,
  onChange,
  onSave,
}: Props) => {
  const toggleColumn = (column: string) => {
    onChange(
      selected.includes(column)
        ? selected.filter((f) => f !== column)
        : [...selected, column]
    );
  };

  return (
    <div className={styles.container}>
      <h3>{messages.textContent.additionalColumns}</h3>
      <div className={styles.checkboxContainer}>
        {availableFields.map((column) => (
          <label key={column}>
            <input
              type="checkbox"
              checked={selected.includes(column)}
              onChange={() => toggleColumn(column)}
              className={styles.checkbox}
            />
            {column}
          </label>
        ))}
      </div>
      <button onClick={onSave}>{messages.buttons.save}</button>
    </div>
  );
};
