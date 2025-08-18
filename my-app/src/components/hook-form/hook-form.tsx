import { useForm } from 'react-hook-form';
import { messages } from '../../messages/messages.ts';
import styles from './hook-form.module.css';

type FormValues = {
  name: string;
  email: string;
};

export const HookForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log('React Hook Form:', data);
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
