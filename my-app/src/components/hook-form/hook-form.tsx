import { useForm } from 'react-hook-form';
import { messages } from '../../messages/messages.ts';
import styles from './hook-form.module.css';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store.ts';
import { addHook } from '../../store/formsSlice.ts';

type FormValues = {
  name: string;
  email: string;
};

type Props = {
  onSuccess: () => void;
}

export const HookForm = ({ onSuccess }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: FormValues) => {
    dispatch(addHook(data));
    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <h2 >{messages.hookForm.title}</h2>
      <input {...register('name')} placeholder={messages.hookForm.inputName.placeholder} className={styles.input}/>
      <input {...register('email')} placeholder={messages.hookForm.inputEmail.placeholder} className={styles.input}/>
      <button type="submit">
        {messages.hookForm.button}
      </button>
    </form>
  );
}
