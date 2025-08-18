import { messages } from '../../messages/messages.ts';
import styles from './uncontrolled-form.module.css';

export const UncontrolledForm = () => {
  return (
    <form className={styles.container}>
      <h2>{messages.uncontrolledForm.title}</h2>
      <input className={styles.input} placeholder={messages.uncontrolledForm.inputName.placeholder}/>
      <input className={styles.input} placeholder={messages.uncontrolledForm.inputEmail.placeholder}/>
      <button type="submit">
        { messages.uncontrolledForm.button}
      </button>
    </form>
  );
}
