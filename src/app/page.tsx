'use client';

import './globals.css';
import useLocalStorage from '../hooks/useLocalStorage.ts';
import { useTheme } from '../context/theme-context.tsx';
import classNames from 'classnames';
import styles from './page.module.css';
import Link from 'next/link';
import Search from '../components/search/search.tsx';
import Results from '../components/results/results.tsx';
import React from 'react';
import PersonDetails from '../components/person-details/person-details.tsx';

export default function HomePage({ children }: { children: React.ReactNode }) {
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
        <div className={styles.detailsWrapper}>
          <PersonDetails />
        </div>
      </div>
    </div>
  );
}
