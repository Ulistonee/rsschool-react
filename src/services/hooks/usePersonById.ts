import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { StarWarsService } from '../api';

export const usePersonById = (id: string | null) => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => {
      if (!id) throw new Error('No personItem ID');
      return StarWarsService.fetchPersonById(id);
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
