import { useEffect, useState } from 'react';
import Card from '../card/card.tsx';
import type { Person } from '../../types/person.ts';
import { StarWarsService } from '../../services/api.ts';
import styles from './results.module.css';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../pagination/pagination.tsx';
import useSearchStore from '../../store/useSearchStore.ts';
import { getId } from '../../utils/getId.ts';
import { saveAs } from 'file-saver';

type Props = {
  query: string;
};

const Results = ({ query }: Props) => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState(pageFromUrl);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const selectedPeople = useSearchStore((state) => state.selectedPeople);
  const unselectPerson = useSearchStore((state) => state.unselectPerson);
  const selectPerson = useSearchStore((state) => state.selectPerson);
  const clearSelection = useSearchStore((state) => state.clearSelection);

  const handleDownload = () => {
    const people = Object.values(selectedPeople);
    const csvRows = [
      ['Name', 'Height', 'Birth Year', 'URL'],
      ...people.map((person) => [
        person.name,
        person.height,
        person.birth_year,
        person.url,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const fileName = `${people.length}_person.csv`;
    saveAs(blob, fileName);
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await StarWarsService.fetchPeople(query, page);

        if (isMounted) {
          setData(result.results);
          setHasNext(Boolean(result.next));
          setHasPrev(Boolean(result.previous));
        }
      } catch (e) {
        if (isMounted) {
          setError(e instanceof Error ? e.message : 'Unknown error');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [query, page]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page, setSearchParams]);

  useEffect(() => {
    const newPage = parseInt(searchParams.get('page') || '1', 10);
    if (newPage !== page) {
      setPage(newPage);
    }
  }, [searchParams]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section data-testid="results" className={styles.resultsContainer}>
      {data.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {data.map((person) => {
            const id = getId(person.url);
            const isSelected = Boolean(selectedPeople[id]);

            const toggleSelection = () => {
              if (isSelected) {
                unselectPerson(id);
              } else {
                selectPerson(person);
              }
            };

            return (
              <li key={id} className={styles.personItem}>
                <label className={styles.personLabel}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={toggleSelection}
                  />
                  <Link to={`/person/${id}`} className={styles.resetLink}>
                    <Card
                      name={person.name}
                      description={`Height: ${person.height}, Birth year: ${person.birth_year}`}
                    />
                  </Link>
                </label>
              </li>
            );
          })}
        </ul>
      )}

      {!isLoading && data.length > 0 && (
        <Pagination
          page={page}
          hasNext={hasNext}
          hasPrev={hasPrev}
          setPage={setPage}
        />
      )}
      {Object.keys(selectedPeople).length > 0 && (
        <div className={styles.flyout}>
          <p>{Object.keys(selectedPeople).length} person selected</p>
          <button onClick={clearSelection}>Unselect all</button>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </section>
  );
};

export default Results;
