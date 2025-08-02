import '@testing-library/jest-dom';
import { it, expect, describe } from 'vitest';
import { act } from 'react-dom/test-utils';

describe('main', () => {
  it('main.tsx loads and renders without crashing', async () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    await act(async () => {
      await import('../src/main');
    });
  });

  it('environment check', () => {
    expect(typeof window).toBe('object');
    expect(document).toBeDefined();
  });
});
