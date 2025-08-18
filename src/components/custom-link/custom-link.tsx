'use client';

import classNames from 'classnames';
import styles from '../../app/page.module.css';
import { Link } from '../../navigation.ts';
import { useTranslations } from 'next-intl';

const CustomLink = () => {
  const t = useTranslations('Navigation');

  return (
    <Link
      href="/about"
      className={classNames(styles.navLink, styles.resetLink)}
    >
      {t('about')}
    </Link>
  );
};

export default CustomLink;
