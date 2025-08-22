import { type InputHTMLAttributes } from 'react';
import styles from './custom-input.module.css';

type Props = {
  id?: string;
  label?: string;
  error?: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const CustomInput = ({ id, label, error, hint, type, ...rest }: Props) => {
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
        className={styles.customInput}
        {...rest}
        required={rest.required}
      />
      {error && <span className={styles.error}>{error}</span>}
      {hint && <small className={styles.hint}>{hint}</small>}
    </div>
  );
};
