import './App.module.css';
import { useState } from 'react';
import Search from './components/search/search.tsx';
import Results from './components/results/results.tsx';
import ErrorThrower from './components/error-thrower/error-thrower.tsx';
import { Outlet } from 'react-router-dom';
import styles from './App.module.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('search') || '';
  });

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    localStorage.setItem('search', trimmed);
    setSearchTerm(trimmed);
  };

  return (
    <>
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
