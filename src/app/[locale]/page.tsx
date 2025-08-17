import classNames from 'classnames';
import styles from '../page.module.css';
import { Link } from '../../navigation';
import Search from '../../components/search/search';
import PersonDetails from '../../components/person-details/person-details';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../../components/language-switcher/language-switcher.tsx';
import ResultsServer from '../../components/results/ResultsServer.tsx';
import ToggleTheme from '../../components/toggle-theme.tsx';
import ThemeLayout from '../../components/theme-layout.tsx';
import { getParamsFromUrl } from '../../utils/getParamsFromUrl.ts';

type SearchParams = { [key: string]: string | string[] | undefined };

export default function HomePage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const t = useTranslations('Navigation');

  const searchQuery = getParamsFromUrl('search', searchParams);
  const pageQuery = Number(getParamsFromUrl('page', searchParams) || 1);

  return (
    <div className={styles.app}>
      <ThemeLayout>
        <header className={styles.header}>
          <nav className={styles.navigation}>
            <Link
              href="/about"
              className={classNames(styles.navLink, styles.resetLink)}
            >
              {t('about')}
            </Link>
          </nav>
          <div className={styles.languageSwitcherContainer}>
            <ToggleTheme />
            <LanguageSwitcher />
          </div>
        </header>
        <Search />
        <div className={styles.mainLayout}>
          <div className={styles.resultsWrapper}>
            <ResultsServer query={searchQuery} page={pageQuery} />
          </div>
          <div className={styles.detailsWrapper}>
            <PersonDetails />
          </div>
        </div>
      </ThemeLayout>
    </div>
  );
}
