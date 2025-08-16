'use client';

// import '../globals.css';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useTheme } from '../../context/theme-context';
import classNames from 'classnames';
import styles from '../page.module.css';
import Link from 'next/link';
import Search from '../../components/search/search';
import Results from '../../components/results/results';
import PersonDetails from '../../components/person-details/person-details';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../../components/language-switcher/language-switcher.tsx';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useLocalStorage('search', '');
  const { theme, toggleTheme } = useTheme();

  const t = useTranslations('Navigation');
  const tTheme = useTranslations('Theme');

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim());
  };

  return (
    <div className={classNames(styles.app, styles[theme])}>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <Link
            href="/about"
            className={classNames(styles.navLink, styles.resetLink)}
          >
            {t('about')}
          </Link>
        </nav>
        <div className={styles.languageSwitcherContainer}>
          <button
            onClick={toggleTheme}
            className={classNames(styles.themeButton, {
              [styles.active]: theme === 'light',
            })}
          >
            {tTheme(theme)}
          </button>
          <LanguageSwitcher />
        </div>
      </header>
      <Search defaultValue={searchTerm} onSearch={handleSearch} theme={theme} />
      <div className={styles.mainLayout}>
        <div className={styles.resultsWrapper}>
          <Results query={searchTerm} />
        </div>
        <div className={styles.detailsWrapper}>
          <PersonDetails />
        </div>
      </div>
    </div>
  );
}
