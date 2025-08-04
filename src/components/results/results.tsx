import Card from '../card/card.tsx';
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
import { useQuery } from '@tanstack/react-query';
import type { PeopleResponse } from '../../services/api.ts';

type Props = {
  query: string;
};

const fetchPeople = async (
  query: string,
  page: number
): Promise<PeopleResponse> => {
  return query
    ? await StarWarsService.fetchPeopleByQuery(query, page)
    : await StarWarsService.defaultFetchPeople(page);
};

const Results = ({ query }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);

  const selectedPeople = useSelectedPeople();
  const unselectPerson = useUnselectPerson();
  const selectPerson = useSelectPerson();
  const clearSelection = useClearSelection();

  const {
    data: result,
    isLoading,
    error,
  } = useQuery<PeopleResponse>({
    queryKey: ['people', query, pageFromUrl],
    queryFn: () => fetchPeople(query, pageFromUrl),
  });

  const persons = result?.results ?? [];
  const hasNext = Boolean(result?.next);
  const hasPrev = Boolean(result?.previous);

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
  if (error) {
    return <div>{error.message}</div>;
  }

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
