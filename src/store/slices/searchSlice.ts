import type { Person } from '../../types/person.ts';
import { getId } from '../../utils/getId.ts';

export type SearchSlice = {
  selectedPeople: Record<string, Person>;
  selectPerson: (person: Person) => void;
  unselectPerson: (id: string) => void;
  clearSelection: () => void;
};

export const createSearchSlice = (
  set: (
    partial:
      | Partial<SearchSlice>
      | ((state: SearchSlice) => Partial<SearchSlice>)
  ) => void
): SearchSlice => ({
  selectedPeople: {},
  selectPerson: (person: Person) =>
    set((state) => ({
      selectedPeople: {
        ...state.selectedPeople,
        [getId(person.url)]: person,
      },
    })),
  unselectPerson: (id: string) =>
    set((state) => {
      const { [id]: _, ...rest } = state.selectedPeople;
      return { selectedPeople: rest };
    }),
  clearSelection: () => set({ selectedPeople: {} }),
});
