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
  { name: 'Name', type: 'string', inputType: 'text'},
  { name: 'Age', type: 'string', inputType: 'number'},
  { name: 'Email', type: 'string', inputType: 'email' },
  { name: 'Password', type: 'string', inputType: 'password' },
  { name: 'Confirm password', type: 'string', inputType: 'password' },
  { name: 'Gender', type: 'string', inputType: 'radio' },
  { name: 'Country', type: 'string', inputType: 'select' },
  { name: 'Picture', type: 'file', inputType: 'file' },
  { name: 'acceptTerms', type: 'boolean', inputType: 'checkbox' },
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
        if (field.name === 'country') {
          return (
            <CustomInput
              id={field.name}
              label={field.name}
              error={errors[field.name]}
              type={field.inputType}
              countries={countries}
            />
          )
        }
        return (
          <CustomInput
            id={field.name}
            label={field.name}
            error={errors[field.name]}
            type={field.inputType}
          />
        )
      })}

      <button type="submit">{messages.uncontrolledForm.button}</button>
    </form>
  );
};
