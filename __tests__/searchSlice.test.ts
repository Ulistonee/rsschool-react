import { describe, it, expect, beforeEach } from 'vitest';
import {
  createSearchSlice,
  type SearchSlice,
} from '../src/store/slices/searchSlice';
import type { Person } from '../src/types/person';

const mockPerson = (id: string): Person => ({
  name: 'Default Name',
  height: '0',
  mass: '',
  hair_color: '',
  skin_color: '',
  eye_color: '',
  birth_year: 'unknown',
  gender: '',
  films: [],
  homeworld: '',
  species: [],
  vehicles: [],
  starships: [],
  created: '',
  edited: '',
  url: 'https://swapi.dev/api/people/999/',
});

describe('createSearchSlice', () => {
  let state: SearchSlice;

  const createSet = () => {
    let currentState: SearchSlice;

    const set = (
      partial:
        | Partial<SearchSlice>
        | ((state: SearchSlice) => Partial<SearchSlice>)
    ) => {
      const nextState =
        typeof partial === 'function' ? partial(currentState) : partial;
      currentState = { ...currentState, ...nextState };
    };

    currentState = createSearchSlice(set);
    return () => currentState;
  };

  let getState: () => SearchSlice;

  beforeEach(() => {
    getState = createSet();
    state = getState();
  });

  it('initially has an empty selectedPeople object', () => {
    expect(state.selectedPeople).toEqual({});
  });

  it('unselects a personItem', () => {
    const person = mockPerson('1');
    state.selectPerson(person);
    state.unselectPerson('1');

    expect(getState().selectedPeople).not.toHaveProperty('1');
  });

  it('clears all selected people', () => {
    state.selectPerson(mockPerson('1'));
    state.selectPerson(mockPerson('2'));

    state.clearSelection();
    expect(getState().selectedPeople).toEqual({});
  });
});
