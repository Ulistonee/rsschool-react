import { useEffect, useState } from 'react';
import Card from '../card/card.tsx';
import type { Person } from '../../types/person.ts';
import { StarWarsService } from '../../services/api.ts';
import styles from './results.module.css';
import { Link, useSearchParams } from 'react-router-dom';

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
          {data.map((person, index) => {
            const id = person.url.split('/').filter(Boolean).pop();
            return (
              <li key={index}>
                <Link to={`/person/${id}`} className={styles.resetLink}>
                  <Card
                    name={person.name}
                    description={`Height: ${person.height}, Birth year: ${person.birth_year}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {!isLoading && data.length > 0 && (
        <div className={styles.paginationContainer}>
          <button onClick={() => setPage((p) => p - 1)} disabled={!hasPrev}>
            ◀ Prev
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage((p) => p + 1)} disabled={!hasNext}>
            Next ▶
          </button>
        </div>
      )}
    </section>
  );
};

export default Results;
