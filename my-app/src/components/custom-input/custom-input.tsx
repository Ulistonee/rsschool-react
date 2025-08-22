import { type InputHTMLAttributes } from 'react';
import styles from './custom-input.module.css';

type Props = {
  id?: string;
  label?: string;
  error?: string;
  countries?: string[];
} & InputHTMLAttributes<HTMLInputElement>;

export const CustomInput = ({ id, label, error, type, countries, ...rest }: Props) => {
  if (id === 'Gender') {
    return (
      <div className={styles.inputContainer}>
        {label && <label>{label}</label>}
        <div>
          <label>
            <input
              type={type}
              name={id}
              value="male"
              {...rest}
            />{' '}
            Male
          </label>
          <label>
            <input
              type={type}
              name={id}
              value="female"
              {...rest}
            />{' '}
            Female
          </label>
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }

  if (id === 'acceptTerms') {
    return (
      <label className={styles.checkboxRow}>
        <input type="checkbox" name="acceptTerms" {...rest} /> Accept Terms and Conditions
        {error && <small className={styles.error}>{error}</small>}
      </label>
    );
  }

  if (id === 'Country') {
    return (
      <div className={styles.inputContainer}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          list="countries"
          className={styles.customInput}
          required
          {...rest}
        />
        <datalist id="countries">
          {countries ? countries.map((c, i) => (
            <option key={i} value={c} />
          )) : ''}
        </datalist>
        {error && <small className={styles.error}>{error}</small>}
      </div>
    );
  }

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={styles.customInput}
        id={id}
        type={type}
        {...rest}
        required={rest.required}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
