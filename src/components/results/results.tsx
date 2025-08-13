'use client';

import styles from './results.module.css';
import Pagination from '../pagination/pagination';
import {
  useSelectedPeople,
  useUnselectPerson,
  useSelectPerson,
  useClearSelection,
} from '../../store/selectors/searchSelectors.ts';
import { getId } from '../../utils/getId.ts';
import { usePeopleQuery } from '../../services/hooks/usePeopleQuery.ts';
import { Flyout } from '../flyout/flyout';
import { PersonItem } from '../personItem/personItem';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';

type Props = {
  query: string;
};

const Results = ({ query }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);

  const selectedPeople = useSelectedPeople();
  const unselectPerson = useUnselectPerson();
  const selectPerson = useSelectPerson();
  const clearSelection = useClearSelection();

  const queryClient = useQueryClient();

  const {
    data: result,
    isLoading,
    isFetching,
    error,
  } = usePeopleQuery(query, pageFromUrl);

  const persons = result?.results ?? [];
  const hasNext = Boolean(result?.next);
  const hasPrev = Boolean(result?.previous);

  const openDetails = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('person', id);
    router.push(`?${params.toString()}`);
  };

  const handlePaginationClick = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(pageFromUrl + nextPage));
    params.delete('person');
    router.push(`?${params.toString()}`);
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
              <PersonItem
                key={id}
                id={id}
                isSelected={isSelected}
                toggleSelection={toggleSelection}
                openDetails={openDetails}
                person={person}
              />
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
        <Flyout
          selectedPeople={selectedPeople}
          clearSelection={clearSelection}
        />
      )}
      <button
        onClick={() => {
          void queryClient.invalidateQueries({
            queryKey: ['people', query, pageFromUrl],
          });

          const id = searchParams.get('person');
          if (id) {
            void queryClient.invalidateQueries({
              queryKey: ['person', id],
            });
          }
        }}
        disabled={isFetching}
      >
        {isFetching ? 'Refreshing...' : 'Refresh API call'}
      </button>
    </section>
  );
};

export default Results;
