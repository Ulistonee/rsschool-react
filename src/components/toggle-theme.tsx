'use client';

import classNames from 'classnames';
import styles from '../app/page.module.css';
import { useTheme } from '../context/theme-context.tsx';
import { useTranslations } from 'next-intl';

export default function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();
  const tTheme = useTranslations('Theme');

  return (
    <button
      onClick={toggleTheme}
      className={classNames(styles.themeButton, {
        [styles.active]: theme === 'light',
      })}
    >
      {tTheme(theme)}
    </button>
  );
}
