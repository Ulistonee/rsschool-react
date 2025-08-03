import { create } from 'zustand';
import type { Person } from '../types/person';
import { getId } from '../utils/getId.ts';

type SearchStore = {
  selectedPeople: Record<string, Person>;
  selectPerson: (person: Person) => void;
  unselectPerson: (id: string) => void;
  clearSelection: () => void;
};

const useSearchStore = create<SearchStore>((set) => ({
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
  clearSelection: () => set({ selectedPeople: {} }),
}));

export default useSearchStore;
