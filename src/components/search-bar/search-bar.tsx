import styles from '../../pages/main-page/main-page.module.css';

type Props = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const SearchBar = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
