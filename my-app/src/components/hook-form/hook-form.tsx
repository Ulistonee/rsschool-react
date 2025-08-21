import { useForm } from 'react-hook-form';
import { messages } from '../../messages/messages.ts';
import styles from './hook-form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { addHook } from '../../store/formsSlice.ts';
import { fileToBase64 } from '../../utils/fileToBase64.ts';

type FormValues = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  country: string;
  picture: FileList;
};

type Props = {
  onSuccess: () => void;
};

export const HookForm = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector((state: RootState) => state.forms.countries);

  const onSubmit = async (data: FormValues) => {
      const file = data.picture[0];
      let pictureBase64 = await fileToBase64(file);

      dispatch(
        addHook({
          ...data,
          age: String(data.age),
          picture: pictureBase64,
        })
      );
      reset();
      onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <h2>{messages.hookForm.title}</h2>

      <div className={styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name', {
            required: 'Name is required',
          })}
          className={styles.input}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          {...register('age', {
            required: 'Age is required',
          })}
          className={styles.input}
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
          })}
          className={styles.input}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Password is required',
          })}
          className={styles.input}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm password',
          })}
          className={styles.input}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label>Gender</label>
        <div>
          <label>
            <input
              type="radio"
              value="male"
              {...register('gender', { required: true })}
            />{' '}
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              {...register('gender', { required: true })}
            />{' '}
            Female
          </label>
        </div>
        {errors.gender && <span>Gender is required</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          list="countries"
          {...register('country', { required: 'Country is required' })}
          className={styles.input}
        />
        <datalist id="countries">
          {countries.map((c, i) => (
            <option key={i} value={c} />
          ))}
        </datalist>
        {errors.country && <span>{errors.country.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="picture">Upload Picture</label>
        <input
          id="picture"
          type="file"
          accept="image/png,image/jpeg"
          {...register('picture')}
        />
      </div>

      <label>
        <input
          type="checkbox"
          {...register('acceptTerms', { required: true })}
        />{' '}
        Accept Terms and Conditions
      </label>
      {errors.acceptTerms && <span>You must accept the terms</span>}

      <button type="submit">{messages.hookForm.button}</button>
    </form>
  );
};
