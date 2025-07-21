import { useEffect, useState } from 'react';
import Card from '../card/card.tsx';
import type { Person } from '../../types/person.ts';
import { StarWarsService } from '../../services/api.ts';

type Props = {
  query: string;
};

const Results = ({ query }: Props) => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await StarWarsService.fetchPeople(query);
        if (isMounted) {
          setData(result);
        }
      } catch (e) {
        if (isMounted) {
          setError(e instanceof Error ? e.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [query]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section data-testid="results">
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <Card
              name={item.name}
              description={`Height: ${item.height} см, Year of birth: ${item.birth_year}`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Results;
