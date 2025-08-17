import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { StarWarsService } from '../api';
import type { PeopleResponse } from '../api';

export const usePeopleQuery = (
  query: string,
  page: number,
  initialData?: PeopleResponse
) => {
  const fetchPeople = async (): Promise<PeopleResponse> => {
    return query
      ? await StarWarsService.fetchPeopleByQuery(query, page)
      : await StarWarsService.defaultFetchPeople(page);
  };

  return useQuery<PeopleResponse>({
    queryKey: ['people', query, page],
    queryFn: fetchPeople,
    staleTime: 1000 * 60 * 5,
    retry: false,
    placeholderData: keepPreviousData,
    initialData,
  });
};
