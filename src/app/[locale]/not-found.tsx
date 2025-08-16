'use client';

import Link from 'next/link';
import styles from './not-found.module.css';
import { useTheme } from '../../context/theme-context.tsx';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

const NotFound = () => {
  const { theme } = useTheme();

  const t = useTranslations('NotFound');

  return (
    <div className={classNames(styles[theme], styles.container)}>
      <h1>{t('title')}</h1>
      <p>
        {t('description')}{' '}
        <Link href="/" className={classNames(styles.navLink, styles.resetLink)}>
          {t('home')}
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
