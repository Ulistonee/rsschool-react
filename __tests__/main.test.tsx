import '@testing-library/jest-dom';
import { it, expect, describe } from 'vitest';

describe.skip('main', () => {
  it('main.tsx loads and renders without crashing', async () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    await import('../src/main');
  });

  it('environment check', () => {
    expect(typeof window).toBe('object');
    expect(document).toBeDefined();
  });
});
