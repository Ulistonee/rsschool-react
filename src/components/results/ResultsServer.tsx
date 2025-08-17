import Results from './results';
import { StarWarsService } from '../../services/api';

type Props = {
  query: string;
  page: number;
};

export default async function ResultsServer({ query, page }: Props) {
  const result = query
    ? await StarWarsService.fetchPeopleByQuery(query, page)
    : await StarWarsService.defaultFetchPeople(page);

  return <Results initialData={result} query={query} page={page} />;
}
