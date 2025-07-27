import './App.module.css';
import Search from './components/search/search.tsx';
import Results from './components/results/results.tsx';
import { Link, Outlet } from 'react-router-dom';
import styles from './App.module.css';
import useLocalStorage from './hooks/useLocalStorage.ts';
import classNames from 'classnames';

const App = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('search', '');

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim());
  };

  return (
    <>
      <header>
        <nav className={styles.navigation}>
          <Link
            to="/about"
            className={classNames(styles.navLink, styles.resetLink)}
          >
            About
          </Link>
        </nav>
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
    </>
  );
};

export default App;
