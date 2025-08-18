'use client';

import classNames from 'classnames';
import styles from './[locale]/not-found.module.css';
import Link from 'next/link';
import { useTheme } from '../context/theme-context.tsx';

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className={classNames(styles[theme], styles.container)}>
      <h1>404 — Page not found</h1>
      <p>
        Check the address or return to{' '}
        <Link
          href="/en"
          className={classNames(styles.navLink, styles.resetLink)}
        >
          home
        </Link>
        .
      </p>
    </div>
  );
}
