import { Link } from 'react-router-dom';
import styles from './not-found.module.css';
import { useTheme } from '../../context/theme-context.tsx';
import classNames from 'classnames';

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames(styles[theme], styles.container)}>
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
