'use client';

import { useTheme } from '../context/theme-context.tsx';
import styles from '../app/page.module.css';
import type { ReactNode } from 'react';
import classNames from 'classnames';

export default function ThemeLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={classNames(styles.app, styles[theme])}>{children}</div>
  );
}
