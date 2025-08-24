import { useForm } from 'react-hook-form';
import { messages } from '../../messages/messages.ts';
import styles from './hook-form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { addHook } from '../../store/formsSlice.ts';
import { fileToBase64 } from '../../utils/fileToBase64.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { CustomInput } from '../custom-input/custom-input.tsx';
import { useMemo, useState } from 'react';
import { testPasswordWeakness } from '../../utils/testPasswordWeakness.ts';
import { buildSchema } from '../../utils/buildSchema.ts';

type Props = {
  onSuccess: () => void;
};

export const HookForm = ({ onSuccess }: Props) => {
  const countries = useSelector((state: RootState) => state.forms.countries);

  const schema = useMemo(() => buildSchema(countries), [countries]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const dispatch = useDispatch<AppDispatch>();

  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const handlePasswordInput = (password: string) => {
    const rules = testPasswordWeakness(password);
    const score = rules.filter(Boolean).length;
    setPasswordStrength(
      score >= 5 ? 'Strength: Strong'
        : score >= 3 ? 'Strength: Medium'
          : 'Strength: Weak'
    );
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
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

      <CustomInput
        id="name"
        label="Name"
        type="text"
        {...register('name')}
        error={errors.name?.message}
      />

      <CustomInput
        id="age"
        label="Age"
        type="number"
        {...register("age", { valueAsNumber: true })}
        error={errors.age?.message}
      />

      <CustomInput
        id="email"
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <CustomInput
        id="password"
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
        hint={passwordStrength}
        onInput={(e) =>
          handlePasswordInput((e.target as HTMLInputElement).value)
        }
      />

      <CustomInput
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

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
        <span className={styles.error}>
          {errors.gender?.message || '\u00A0'}
        </span>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          list="countries"
          autoComplete="country-name"
          {...register('country')}
          className={styles.customInput}
        />
        <datalist id="countries">
          {countries.map((c, i) => (
            <option key={i} value={c} />
          ))}
        </datalist>
        <span className={styles.error}>
          {errors.country?.message || '\u00A0'}
        </span>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="picture">Upload Picture</label>
        <input
          id="picture"
          type="file"
          accept="image/png,image/jpeg"
          {...register('picture')}
        />
        <span className={styles.error}>
          {errors.picture?.message || '\u00A0'}
        </span>
      </div>

      <label className={styles.checkboxRow}>
        <input type="checkbox" {...register('acceptTerms')} /> Accept Terms and
        Conditions
      </label>
      <span className={styles.error}>
        {errors.acceptTerms?.message || '\u00A0'}
      </span>

      <button type="submit" disabled={!isValid}>
        {messages.hookForm.button}
      </button>
    </form>
  );
};
