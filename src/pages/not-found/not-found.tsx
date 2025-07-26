import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

const NotFound = () => {
  return (
    <div>
      <h1>404 — Page not found</h1>
      <p>
        Check the address or return to{' '}
        <Link to="/" className={styles.link}>
          Home
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
