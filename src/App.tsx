import './App.module.css';
import Search from './components/search/search.tsx';
import Results from './components/results/results.tsx';
import ErrorThrower from './components/error-thrower/error-thrower.tsx';
import { Link, Outlet } from 'react-router-dom';
import styles from './App.module.css';
import useLocalStorage from './hooks/useLocalStorage.ts';

const App = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('search', '');

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim());
  };

  return (
    <>
      <header>
        <nav>
          <Link to="/about" className={styles.resetLink}>
            About
          </Link>
        </nav>
      </header>
      <Search defaultValue={searchTerm} onSearch={handleSearch} />
      <div className={styles.mainLayout}>
        <div className={styles.left}>
          <Results query={searchTerm} />
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
      <ErrorThrower />
    </>
  );
};

export default App;
