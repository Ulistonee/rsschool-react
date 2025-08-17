import styles from '../page.module.css';
import Search from '../../components/search/search';
import PersonDetails from '../../components/person-details/person-details';
import LanguageSwitcher from '../../components/language-switcher/language-switcher.tsx';
import ResultsServer from '../../components/results/ResultsServer.tsx';
import ToggleTheme from '../../components/toggle-theme.tsx';
import ThemeLayout from '../../components/theme-layout.tsx';
import { getParamsFromUrl } from '../../utils/getParamsFromUrl.ts';
import CustomLink from '../../components/custom-link/custom-link.tsx';

type SearchParams = { [key: string]: string | string[] | undefined };

export default function HomePage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const searchQuery = getParamsFromUrl('search', searchParams);
  const pageQuery = Number(getParamsFromUrl('page', searchParams) || 1);

  return (
    <div className={styles.app}>
      <ThemeLayout>
        <header className={styles.header}>
          <nav className={styles.navigation}>
            <CustomLink />
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
