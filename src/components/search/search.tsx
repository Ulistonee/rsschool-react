'use client';

import React, { useState } from 'react';
import styles from './search.module.css';
import { useTranslations } from 'next-intl';

type Props = {
  defaultValue?: string;
  onSearch: (value: string) => void;
  theme: 'light' | 'dark';
};

const Search: React.FC<Props> = ({ defaultValue = '', onSearch, theme }) => {
  const [value, setValue] = useState(defaultValue);

  const t = useTranslations('Search');

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
        placeholder={t('placeholder')}
        className={styles.searchInput}
      />
      <button onClick={handleClick}>{t('button')}</button>
    </section>
  );
};

export default Search;
