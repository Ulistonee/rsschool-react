import { create } from 'zustand';
import type { SearchSlice } from './slices/searchSlice';
import { createSearchSlice } from './slices/searchSlice';

export const useSearchStore = create<SearchSlice>()((set) => ({
  ...createSearchSlice(set),
}));

export default useSearchStore;
