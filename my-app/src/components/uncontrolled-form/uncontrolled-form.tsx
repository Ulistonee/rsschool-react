import { messages } from '../../messages/messages.ts';
import styles from './uncontrolled-form.module.css';
import { addUncontrolled } from '../../store/formsSlice.ts';
import { type FormEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { fileToBase64 } from '../../utils/fileToBase64.ts';
import { buildSchema } from '../../utils/buildSchema.ts';
import { testPasswordWeakness } from '../../utils/testPasswordWeakness.ts';
import { type FieldConfig, getFormValues } from '../../utils/getFormValues.ts';
import { CustomInput } from '../custom-input/custom-input.tsx';

const fields: FieldConfig[] = [
  { name: 'name', type: 'string', inputType: 'text' },
  { name: 'age', type: 'string', inputType: 'number'},
  { name: 'email', type: 'string', inputType: 'email' },
  { name: 'password', type: 'string', inputType: 'password' },
  { name: 'confirmPassword', type: 'string', inputType: 'password' },
  { name: 'gender', type: 'string', inputType: 'radio' },
  { name: 'acceptTerms', type: 'boolean', inputType: 'checkbox' },
  { name: 'country', type: 'string', inputType: 'select' },
  { name: 'picture', type: 'file', inputType: 'file' },
];

type Props = {
  onSuccess: () => void;
};

export const UncontrolledForm = ({ onSuccess }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector((state: RootState) => state.forms.countries);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const schema = useMemo(() => buildSchema(countries), [countries]);

  const handlePasswordInput = (password: string) => {
    const rules = testPasswordWeakness(password);
    const score = rules.filter(Boolean).length;
    setPasswordStrength(
      score >= 5 ? 'Strength: Strong'
        : score >= 3 ? 'Strength: Medium'
          : 'Strength: Weak'
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    const formData = new FormData(e.currentTarget);
    const formValues = getFormValues(formData, fields)

    const result = schema.safeParse(formValues);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    let pictureBase64: string | null = null;
    if (result.data.picture) {
      pictureBase64 = await fileToBase64(result.data.picture);
    }

    dispatch(
      addUncontrolled({
        name: result.data.name,
        age: String(result.data.age),
        email: result.data.email,
        gender: result.data.gender,
        country: result.data.country,
        picture: pictureBase64 !== null ? pictureBase64 : '',
      })
    );

    e.currentTarget.reset();
    setPasswordStrength('');
    onSuccess();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit} noValidate>
      <h2>{messages.uncontrolledForm.title}</h2>

      {fields.map((field) => {
        switch (field.inputType) {
          case 'radio':
            return (
              <div key={field.name} className={styles.inputContainer}>
                <label>Gender</label>
                <div>
                  <label>
                    <input type="radio" name="gender" value="male" /> Male
                  </label>
                  <label>
                    <input type="radio" name="gender" value="female" /> Female
                  </label>
                </div>
                {errors.gender && <small className={styles.error}>{errors.gender}</small>}
              </div>
            );

          case 'checkbox':
            return (
              <label key={field.name} className={styles.checkboxRow}>
                <input type="checkbox" name={field.name} /> Accept Terms and Conditions
                {errors.acceptTerms && <small className={styles.error}>{errors.acceptTerms}</small>}
              </label>
            );

          case 'select':
            return (
              <div key={field.name} className={styles.inputContainer}>
                <label htmlFor="country">Country</label>
                <input id="country" name="country" list="countries" className={styles.input} required />
                <datalist id="countries">
                  {countries.map((c, i) => (
                    <option key={i} value={c} />
                  ))}
                </datalist>
                {errors.country && <small className={styles.error}>{errors.country}</small>}
              </div>
            );

          case 'file':
            return (
              <div key={field.name} className={styles.inputContainer}>
                <label htmlFor="picture">Upload Picture</label>
                <input id="picture" name="picture" type="file" accept="image/png,image/jpeg" />
                {errors.picture && <small className={styles.error}>{errors.picture}</small>}
              </div>
            );

          default:
            return (
              <CustomInput
                key={field.name}
                id={field.name}
                name={field.name}
                label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                type={field.inputType}
                error={errors[field.name]}
                required
                className={styles.input}
                onInput={
                  field.name === 'password'
                    ? (e) => handlePasswordInput((e.target as HTMLInputElement).value)
                    : undefined
                }
              />
            );
        }
      })}

      {passwordStrength && (
        <small className={styles.hint}>{passwordStrength}</small>
      )}

      <button type="submit">{messages.uncontrolledForm.button}</button>
    </form>
  );
};
