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
import { useTranslations } from 'next-intl';
import { type PeopleResponse } from '../../services/api.ts';

type Props = {
  query: string;
  page: number;
  initialData: PeopleResponse;
};

const Results = (props: Props) => {
  const { query, page, initialData } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = page;

  const selectedPeople = useSelectedPeople();
  const unselectPerson = useUnselectPerson();
  const selectPerson = useSelectPerson();
  const clearSelection = useClearSelection();

  const queryClient = useQueryClient();

  const t = useTranslations('Refresh');

  const {
    data: result,
    isLoading,
    isFetching,
    error,
  } = usePeopleQuery(query, pageFromUrl, initialData);

  const persons = result?.results ?? [];
  const hasNext = Boolean(result?.next);
  const hasPrev = Boolean(result?.previous);

  const openDetails = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('person', id);
    router.push(`?${params.toString()}`);
  };

  const handlePaginationClick = (delta: number) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentPage = Number(params.get('page') || pageFromUrl || 1);
    const newPage = currentPage + delta;
    params.set('page', String(newPage));
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
        {isFetching ? t('state') : t('button')}
      </button>
    </section>
  );
};

export default Results;
