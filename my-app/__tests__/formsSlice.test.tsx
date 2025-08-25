import formsReducer, { addHook, addUncontrolled, type FormData } from '../src/store/formsSlice';
import { describe, it, expect } from 'vitest';

describe('formsSlice', () => {
  const initialState = {
    uncontrolled: [],
    hook: [],
    countries: expect.any(Array),
  };

  const sampleData: FormData = {
    name: 'John Doe',
    age: '30',
    email: 'john@example.com',
    gender: 'male',
    country: 'United States of America',
    picture: 'image.png',
  };

  it('should return the initial state', () => {
    const state = formsReducer(undefined, { type: '@@INIT' });
    expect(state.uncontrolled).toEqual([]);
    expect(state.hook).toEqual([]);
    expect(state.countries.length).toBeGreaterThan(0);
  });

  it('should handle addUncontrolled', () => {
    const nextState = formsReducer(initialState as any, addUncontrolled(sampleData));
    expect(nextState.uncontrolled).toHaveLength(1);
    expect(nextState.uncontrolled[0]).toEqual(sampleData);
    expect(nextState.hook).toEqual([]);
  });

  it('should handle addHook', () => {
    const nextState = formsReducer(initialState as any, addHook(sampleData));
    expect(nextState.hook).toHaveLength(1);
    expect(nextState.hook[0]).toEqual(sampleData);
    expect(nextState.uncontrolled).toEqual([]);
  });
});
