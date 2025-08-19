import { messages } from '../../messages/messages.ts';
import styles from './uncontrolled-form.module.css';
import { addUncontrolled } from '../../store/formsSlice.ts';
import type { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store.ts';

export const UncontrolledForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const formData = new FormData(e.currentTarget);

    console.log(formData);

    dispatch(
      addUncontrolled({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      })
    );

    e.currentTarget.reset();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>{messages.uncontrolledForm.title}</h2>
      <input
        className={styles.input}
        placeholder={messages.uncontrolledForm.inputName.placeholder}
        name={messages.uncontrolledForm.inputName.name}
      />
      <input
        className={styles.input}
        placeholder={messages.uncontrolledForm.inputEmail.placeholder}
        name={messages.uncontrolledForm.inputEmail.name}
      />
      <button type="submit">{messages.uncontrolledForm.button}</button>
    </form>
  );
};
