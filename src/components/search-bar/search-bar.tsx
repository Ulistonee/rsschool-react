import styles from '../../pages/main-page/main-page.module.css';
import * as React from 'react';

type Props = {
  searchTerm: string;
  handleSearch: (term: string) => void;
};

const SearchBarComponent = ({ searchTerm, handleSearch }: Props) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

SearchBarComponent.displayName = 'SearchBar';

export const SearchBar = React.memo(SearchBarComponent);
