'use client';

import { useTheme } from '../context/theme-context.tsx';
import styles from '../app/page.module.css';
import type { ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  additionalStyle?: string;
  children: ReactNode;
};

export default function ThemeLayout({
  additionalStyle = styles.app,
  children,
}: Props) {
  const { theme } = useTheme();

  return (
    <div className={classNames(additionalStyle, styles[theme])}>{children}</div>
  );
}
