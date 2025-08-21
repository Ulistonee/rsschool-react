import { type InputHTMLAttributes } from 'react';
import styles from './custom-input.module.css';

type Props = {
  id?: string;
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const CustomInput = ({ id, label, error, type, ...rest }: Props) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={styles.input}
        {...rest}
        required={rest.required}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
