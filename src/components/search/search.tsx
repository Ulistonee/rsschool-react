import React, { useState } from 'react';
import styles from './search.module.css';

type Props = {
  defaultValue?: string;
  onSearch: (value: string) => void;
};

const Search: React.FC<Props> = ({ defaultValue = '', onSearch }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    onSearch(value);
  };

  return (
    <section className={styles.searchContainer}>
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
