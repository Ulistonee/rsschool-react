import { create } from 'zustand';
import type { Person } from '../types/person';
import { getId } from '../utils/getId.ts';

type SearchStore = {
  query: string;
  page: number;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;

  selectedPeople: Record<string, Person>;
  selectPerson: (person: Person) => void;
  unselectPerson: (id: string) => void;
  isSelected: (id: string) => boolean;
};

const useSearchStore = create<SearchStore>((set, get) => ({
  query: '',
  page: 1,
  setQuery: (query) => set({ query, page: 1 }),
  setPage: (page) => set({ page }),

  selectedPeople: {},
  selectPerson: (person) =>
    set((state) => ({
      selectedPeople: { ...state.selectedPeople, [getId(person.url)]: person },
    })),
  unselectPerson: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.selectedPeople;
      return { selectedPeople: rest };
    }),
  isSelected: (id) => !!get().selectedPeople[id],
}));

export default useSearchStore;
