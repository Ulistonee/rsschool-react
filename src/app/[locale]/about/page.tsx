'use client';

import styles from './about.module.css';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../context/theme-context';
import classNames from 'classnames';

const AboutPage = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const handleClose = () => {
    router.push('/');
  };
  return (
    <div className={classNames(styles.container, styles[theme])}>
      <section className={styles.aboutSection}>
        <h2>About This App</h2>
        <p>
          This application was developed as a Star Wars character search demo
          using the SWAPI API in frames of React Course by RSSchool.
        </p>

        <h3>Author</h3>
        <p>
          <strong>Name:</strong> Aizhan
        </p>
        <p>
          <strong>Location:</strong> Kazakhstan
        </p>
        <p>
          <strong>Technologies:</strong> React, TypeScript, React Router, CSS
          Modules
        </p>
        <p>
          <a href="https://rs.school/courses/reactjs">RSSchool website</a>
        </p>
      </section>
      <button onClick={handleClose} className={styles.closeButton}>
        &larr; Back
      </button>
    </div>
  );
};

export default AboutPage;
