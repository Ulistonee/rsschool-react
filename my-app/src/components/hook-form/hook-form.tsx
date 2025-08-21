import { useForm } from 'react-hook-form';
import { messages } from '../../messages/messages.ts';
import styles from './hook-form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { addHook } from '../../store/formsSlice.ts';
import { fileToBase64 } from '../../utils/fileToBase64.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

const schema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .regex(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter'),
    age: z
      .number({ invalid_type_error: 'Age must be a number' })
      .min(0, 'Age must be positive'),
    email: z.string().email('Invalid email'),
    password: passwordSchema,
    confirmPassword: z.string().nonempty('Please confirm password'),
    gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Gender is required' }) }),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms' }),
    }),
    country: z.string().nonempty('Country is required'),
    picture: z
      .any()
      .refine((files) => files?.length === 1, 'Picture is required')
      .refine(
        (files) => {
          if (!files?.[0]) return false;
          return ['image/png', 'image/jpeg'].includes(files[0].type);
        },
        'Only PNG or JPEG allowed'
      )
      .refine(
        (files) => {
          if (!files?.[0]) return false;
          return files[0].size <= 2 * 1024 * 1024; // <= 2MB
        },
        'File size must be less than 2MB'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

type FormValues = z.infer<typeof schema>;

type Props = {
  onSuccess: () => void;
};

export const HookForm = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const countries = useSelector((state: RootState) => state.forms.countries);
  const dispatch = useDispatch<AppDispatch>();

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
        <input id="name" {...register('name')} className={styles.input} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" {...register('age', { valueAsNumber: true })} className={styles.input} />
        {errors.age && <span>{errors.age.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} className={styles.input} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} className={styles.input} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" {...register('confirmPassword')} className={styles.input} />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label>Gender</label>
        <div>
          <label>
            <input type="radio" value="male" {...register('gender')} /> Male
          </label>
          <label>
            <input type="radio" value="female" {...register('gender')} /> Female
          </label>
        </div>
        {errors.gender && <span>{errors.gender.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="country">Country</label>
        <input id="country" list="countries" {...register('country')} className={styles.input} />
        <datalist id="countries">
          {countries.map((c, i) => (
            <option key={i} value={c} />
          ))}
        </datalist>
        {errors.country && <span>{errors.country.message}</span>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" type="file" accept="image/png,image/jpeg" {...register('picture')} />
        {errors.picture && <span>{errors.picture.message}</span>}
      </div>

      <label>
        <input type="checkbox" {...register('acceptTerms')} /> Accept Terms and Conditions
      </label>
      {errors.acceptTerms && <span>{errors.acceptTerms.message}</span>}

      <button type="submit" disabled={!isValid}>
        {messages.hookForm.button}
      </button>
    </form>
  );
};
