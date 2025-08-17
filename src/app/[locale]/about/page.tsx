import styles from './about.module.css';
import { useTranslations } from 'next-intl';
import ThemeLayout from '../../../components/theme-layout.tsx';
import { CloseButton } from '../../../components/close-button/close-button.tsx';

const AboutPage = () => {
  const t = useTranslations('About');

  return (
    <ThemeLayout additionalStyle={styles.container}>
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
        <CloseButton />
      </section>
    </ThemeLayout>
  );
};

export default AboutPage;
