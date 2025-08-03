import React, { useState } from 'react';
import styles from './search.module.css';

type Props = {
  defaultValue?: string;
  onSearch: (value: string) => void;
  theme: 'light' | 'dark';
};

const Search: React.FC<Props> = ({ defaultValue = '', onSearch, theme }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    onSearch(value);
  };

  return (
    <section className={`${styles.searchContainer} ${styles[theme]}`}>
      <input
        value={value}
        onChange={handleChange}
        placeholder="search..."
        className={styles.searchInput}
      />
      <button onClick={handleClick}>search</button>
    </section>
  );
};

export default Search;
