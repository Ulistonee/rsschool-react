import { useQuery } from '@tanstack/react-query';
import { StarWarsService } from '../services/api';
import type { PeopleResponse } from '../services/api';

export const usePeopleQuery = (query: string, page: number) => {
  const fetchPeople = async (): Promise<PeopleResponse> => {
    return query
      ? await StarWarsService.fetchPeopleByQuery(query, page)
      : await StarWarsService.defaultFetchPeople(page);
  };

  return useQuery<PeopleResponse>({
    queryKey: ['people', query, page],
    queryFn: fetchPeople,
    staleTime: 1000 * 60 * 5,
  });
};
