import { useEffect, useState } from 'react';
import Card from '../card/card.tsx';
import type { Person } from '../../types/person.ts';
import { StarWarsService } from '../../services/api.ts';
import styles from './results.module.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Pagination from '../pagination/pagination.tsx';
import useSearchStore from '../../store/useSearchStore.ts';
import { getId } from '../../utils/getId.ts';
import { saveAs } from 'file-saver';
import classNames from 'classnames';

type Props = {
  query: string;
};

const Results = ({ query }: Props) => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const navigate = useNavigate();

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
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await StarWarsService.fetchPeople(query, pageFromUrl);
        setPersons(result.results);
        setHasNext(Boolean(result.next));
        setHasPrev(Boolean(result.previous));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query, pageFromUrl]);

  const openDetails = (id: string) => {
    const currentUrl = location.pathname + location.search;
    navigate(`/person/${id}?${searchParams.toString()}`, {
      state: { from: currentUrl },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section data-testid="results" className={styles.resultsContainer}>
      {persons.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {persons.map((person) => {
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
                  <button
                    className={classNames(styles.resetLink, styles.person)}
                    onClick={() => {
                      openDetails(id);
                    }}
                  >
                    <Card
                      name={person.name}
                      description={`Height: ${person.height}, Birth year: ${person.birth_year}`}
                    />
                  </button>
                </label>
              </li>
            );
          })}
        </ul>
      )}

      {!isLoading && persons.length > 0 && (
        <Pagination
          pageNumber={pageFromUrl}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onPrevPage={() => {
            const params = new URLSearchParams(searchParams);
            params.set('page', String(pageFromUrl - 1));
            params.delete('person');
            navigate({
              pathname: '/',
              search: params.toString(),
            });
          }}
          onNextPage={() => {
            const params = new URLSearchParams(searchParams);
            params.set('page', String(pageFromUrl + 1));
            params.delete('person');
            navigate({
              pathname: '/',
              search: params.toString(),
            });
          }}
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
