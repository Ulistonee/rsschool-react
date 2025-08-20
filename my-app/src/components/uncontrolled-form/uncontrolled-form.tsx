import { messages } from '../../messages/messages.ts';
import styles from './uncontrolled-form.module.css';
import { addUncontrolled } from '../../store/formsSlice.ts';
import type { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';

type Props = {
  onSuccess: () => void;
};

export const UncontrolledForm = ({ onSuccess }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector((state: RootState) => state.forms.countries);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    const acceptTerms = acceptTermsValue !== null; // true, если чекбокс был выставлен

    const countryValue = formData.get('country');
    const country = typeof countryValue === 'string' ? countryValue : '';

    const pictureValue = formData.get('picture');
    const picture = pictureValue instanceof File ? pictureValue : null;
    let pictureBase64 = await fileToBase64(picture);

    dispatch(
      addUncontrolled({
        name,
        age,
        email,
        gender,
        country,
        picture: pictureBase64,
      })
    );

    e.currentTarget.reset();
    onSuccess();
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>{messages.uncontrolledForm.title}</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label>Gender</label>
        <div>
          <label>
            <input type="radio" name="gender" value="male" /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" /> Female
          </label>
        </div>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          list="countries"
          className={styles.input}
        />
        <datalist id="countries">
          {countries.map((c, i) => (
            <option key={i} value={c} />
          ))}
        </datalist>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="picture">Upload Picture</label>
        <input
          id="picture"
          name="picture"
          type="file"
          accept="image/png,image/jpeg"
        />
      </div>

      <label>
        <input type="checkbox" name="acceptTerms" /> Accept Terms and Conditions
      </label>
      <button type="submit">{messages.uncontrolledForm.button}</button>
    </form>
  );
};
