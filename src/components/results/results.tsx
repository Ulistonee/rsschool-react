import { useEffect, useState } from 'react';
import Card from '../card/card.tsx';
import type { Person } from '../../types/person.ts';
import { StarWarsService } from '../../services/api.ts';
import styles from './results.module.css';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../pagination/pagination.tsx';
import {
  useSelectedPeople,
  useUnselectPerson,
  useSelectPerson,
  useClearSelection,
} from '../../store/selectors/searchSelectors.ts';
import { getId } from '../../utils/getId.ts';
import classNames from 'classnames';
import { handleDownload } from '../../utils/handleDownload.ts';

type Props = {
  query: string;
};

const Results = ({ query }: Props) => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);

  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const selectedPeople = useSelectedPeople();
  const unselectPerson = useUnselectPerson();
  const selectPerson = useSelectPerson();
  const clearSelection = useClearSelection();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = query
          ? await StarWarsService.fetchPeopleByQuery(query, pageFromUrl)
          : await StarWarsService.defaultFetchPeople(pageFromUrl);
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
    const params = new URLSearchParams(searchParams);
    params.set('person', id);
    setSearchParams(params);
  };

  const handlePaginationClick = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(pageFromUrl + nextPage));
    params.delete('person');
    setSearchParams(params);
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
                    onClick={() => openDetails(id)}
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
          onPrevPage={() => handlePaginationClick(-1)}
          onNextPage={() => handlePaginationClick(1)}
        />
      )}
      {Object.keys(selectedPeople).length > 0 && (
        <div className={styles.flyout}>
          <p>{Object.keys(selectedPeople).length} person selected</p>
          <button onClick={clearSelection}>Unselect all</button>
          <button onClick={() => handleDownload(selectedPeople)}>
            Download
          </button>
        </div>
      )}
    </section>
  );
};

export default Results;
