import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import useLocalStorage from '../src/hooks/useLocalStorage';
import React from 'react';

function TestComponent() {
  const [value, setValue] = useLocalStorage<string>('testKey', 'default');

  return (
    <div>
      <span data-testid="value">{value}</span>
      <button onClick={() => setValue('updated')}>Update</button>
    </div>
  );
}

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('returns default value when localStorage is empty', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('value').textContent).toBe('default');
  });

  it('returns saved value from localStorage if present', () => {
    localStorage.setItem('testKey', JSON.stringify('stored value'));
    render(<TestComponent />);
    expect(screen.getByTestId('value').textContent).toBe('stored value');
  });

  it('updates localStorage when value changes', () => {
    render(<TestComponent />);
    fireEvent.click(screen.getByText(/Update/i));
    expect(screen.getByTestId('value').textContent).toBe('updated');
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('updated'));
  });

  it('handles JSON parse error gracefully', () => {
    localStorage.setItem('testKey', 'invalid json');
    render(<TestComponent />);
    expect(screen.getByTestId('value').textContent).toBe('default');
  });
});
