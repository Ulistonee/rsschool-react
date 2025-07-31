import './App.module.css';
import Search from './components/search/search.tsx';
import Results from './components/results/results.tsx';
import { Link, Outlet } from 'react-router-dom';
import styles from './App.module.css';
import useLocalStorage from './hooks/useLocalStorage.ts';
import classNames from 'classnames';
import { useTheme } from './context/theme-context.tsx';

const App = () => {
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
            to="/about"
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
      <Search defaultValue={searchTerm} onSearch={handleSearch} />
      <div className={styles.mainLayout}>
        <div className={styles.resultsWrapper}>
          <Results query={searchTerm} />
        </div>
        <div className={styles.detailsWrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
