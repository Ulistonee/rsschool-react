import useSearchStore from '../useSearchStore';

export const useSelectedPeople = () =>
  useSearchStore((state) => state.selectedPeople);

export const useSelectPerson = () =>
  useSearchStore((state) => state.selectPerson);

export const useUnselectPerson = () =>
  useSearchStore((state) => state.unselectPerson);

export const useClearSelection = () =>
  useSearchStore((state) => state.clearSelection);
