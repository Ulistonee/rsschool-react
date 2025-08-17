'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';

function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  const otherLocale = locale === 'en' ? 'ru' : 'en';

  const newPath = `/${otherLocale}${pathname.replace(/^\/(en|ru)/, '')}`;

  return <Link href={newPath}>{otherLocale.toUpperCase()}</Link>;
}

export default LanguageSwitcher;
