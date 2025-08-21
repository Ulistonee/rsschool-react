import { messages } from '../../messages/messages.ts';
import styles from './uncontrolled-form.module.css';
import { addUncontrolled } from '../../store/formsSlice.ts';
import { type FormEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { fileToBase64 } from '../../utils/fileToBase64.ts';
import { buildSchema } from '../../utils/buildSchema.ts';

type Props = {
  onSuccess: () => void;
};

export const UncontrolledForm = ({ onSuccess }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector((state: RootState) => state.forms.countries);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pwdStrength, setPwdStrength] = useState<string>('');

  const schema = useMemo(() => buildSchema(countries), [countries]);

  const handlePasswordInput = (value: string) => {
    const rules = [
      /[0-9]/.test(value),
      /[A-Z]/.test(value),
      /[a-z]/.test(value),
      /[^A-Za-z0-9]/.test(value),
      value.length >= 6,
    ];
    const score = rules.filter(Boolean).length;
    setPwdStrength(
      score >= 5 ? 'Strength: Strong'
        : score >= 3 ? 'Strength: Medium'
          : 'Strength: Weak'
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);

    const nameValue = formData.get('name');
    const name = typeof nameValue === 'string' ? nameValue : '';

    const ageValue = formData.get('age');
    const age = typeof ageValue === 'string' ? ageValue : '0';

    const emailValue = formData.get('email');
    const email = typeof emailValue === 'string' ? emailValue : '';

    const passwordValue = formData.get('password');
    const password = typeof passwordValue === 'string' ? passwordValue : '';

    const confirmPasswordValue = formData.get('confirmPassword');
    const confirmPassword =
      typeof confirmPasswordValue === 'string' ? confirmPasswordValue : '';

    const genderValue = formData.get('gender');
    const gender = typeof genderValue === 'string' ? genderValue : '';

    const acceptTermsValue = formData.get('acceptTerms');
    const acceptTerms = acceptTermsValue !== null;

    const countryValue = formData.get('country');
    const country = typeof countryValue === 'string' ? countryValue : '';

    const pictureValue = formData.get('picture');
    const picture = pictureValue instanceof File ? pictureValue : null;

    const dataToObject = {
      name,
      age,
      email,
      password,
      confirmPassword,
      gender,
      acceptTerms,
      country,
      picture: picture,
    }

    const result = schema.safeParse(dataToObject);
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
        picture: pictureBase64,
      })
    );

    e.currentTarget.reset();
    setPwdStrength('');
    onSuccess();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit} noValidate>
      <h2>{messages.uncontrolledForm.title}</h2>

      <div className={styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" className={styles.input} required />
      </div>
      {errors.name && <small className={styles.error}>{errors.name}</small>}

      <div className={styles.inputContainer}>
        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" className={styles.input} required />
      </div>
      {errors.age && <small className={styles.error}>{errors.age}</small>}

      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className={styles.input} required />
      </div>
      {errors.email && <small className={styles.error}>{errors.email}</small>}

      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
          required
          onInput={(e) => handlePasswordInput((e.target as HTMLInputElement).value)}
        />
      </div>
      <small className={styles.hint}>{pwdStrength}</small>
      {errors.password && <small className={styles.error}>{errors.password}</small>}

      <div className={styles.inputContainer}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" className={styles.input} required />
      </div>
      {errors.confirmPassword && <small className={styles.error}>{errors.confirmPassword}</small>}

      <div className={styles.inputContainer}>
        <label>Gender</label>
        <div>
          <label><input type="radio" name="gender" value="male" /> Male</label>
          <label><input type="radio" name="gender" value="female" /> Female</label>
        </div>
      </div>
      {errors.gender && <small className={styles.error}>{errors.gender}</small>}

      <div className={styles.inputContainer}>
        <label htmlFor="country">Country</label>
        <input id="country" name="country" list="countries" className={styles.input} required />
        <datalist id="countries">
          {countries.map((c, i) => (<option key={i} value={c} />))}
        </datalist>
      </div>
      {errors.country && <small className={styles.error}>{errors.country}</small>}

      <div className={styles.inputContainer}>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" name="picture" type="file" accept="image/png,image/jpeg" />
      </div>
      {errors.picture && <small className={styles.error}>{errors.picture}</small>}

      <label className={styles.checkboxRow}>
        <input type="checkbox" name="acceptTerms" /> Accept Terms and Conditions
      </label>
      {errors.acceptTerms && <small className={styles.error}>{errors.acceptTerms}</small>}

      <button type="submit">{messages.uncontrolledForm.button}</button>
    </form>
  );
};
