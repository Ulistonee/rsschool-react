'use client';

import styles from '../../app/[locale]/about/about.module.css';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const CloseButton = () => {
  const router = useRouter();

  const t = useTranslations('About');

  const handleClose = () => {
    router.push('/');
  };
  return (
    <button onClick={handleClose} className={styles.closeButton}>
      &larr; {t('button')}
    </button>
  );
};
