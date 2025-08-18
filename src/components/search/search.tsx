'use client';

import React, { useState } from 'react';
import styles from './search.module.css';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/theme-context.tsx';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  defaultValue?: string;
};

const Search: React.FC<Props> = ({ defaultValue = '' }) => {
  const [value, setValue] = useState(defaultValue);
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('Search');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', value);
    params.delete('person');
    params.delete('page');
    router.push(`?${params.toString()}`);
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
