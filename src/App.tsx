import './App.module.css';
import Search from './components/search/search';
import Results from './components/results/results';
import Link from 'next/link';
import styles from './App.module.css';
import useLocalStorage from './hooks/useLocalStorage.ts';
import classNames from 'classnames';
import { useTheme } from './context/theme-context';
import React from 'react';

const App = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useLocalStorage('search', '');
  const { theme, toggleTheme } = useTheme();

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
            about
          </Link>
        </nav>
        <button
          onClick={toggleTheme}
          className={classNames(styles.themeButton, {
            [styles.active]: theme === 'light',
          })}
        >
          {theme}
        </button>
      </header>
      <Search defaultValue={searchTerm} onSearch={handleSearch} theme={theme} />
      <div className={styles.mainLayout}>
        <div className={styles.resultsWrapper}>
          <Results query={searchTerm} />
        </div>
        <div className={styles.detailsWrapper}>{children}</div>
      </div>
    </div>
  );
};

export default App;
