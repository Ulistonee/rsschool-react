'use client';

import styles from './about.module.css';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../context/theme-context';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

const AboutPage = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const t = useTranslations('About');

  const handleClose = () => {
    router.push('/');
  };
  return (
    <div className={classNames(styles.container, styles[theme])}>
      <section className={styles.aboutSection}>
        <h2>{t('title')}</h2>
        <p>{t('description')} </p>

        <h3>{t('titleAuthor')}</h3>
        <p>
          <strong>{t('titleName')}</strong> {t('name')}
        </p>
        <p>
          <strong>{t('titleLocation')}</strong> {t('country')}
        </p>
        <p>
          <strong>{t('titleTechnologies')}</strong> {t('technologies')}
        </p>
        <p>
          <a href="https://rs.school/courses/reactjs">{t('course')}</a>
        </p>
      </section>
      <button onClick={handleClose} className={styles.closeButton}>
        &larr; {t('button')}
      </button>
    </div>
  );
};

export default AboutPage;
