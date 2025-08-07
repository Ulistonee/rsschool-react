import { useQuery } from '@tanstack/react-query';
import { StarWarsService } from '../services/api';

export const usePersonById = (id: string | null) => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => {
      if (!id) throw new Error('No person ID');
      return StarWarsService.fetchPersonById(id);
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
};
