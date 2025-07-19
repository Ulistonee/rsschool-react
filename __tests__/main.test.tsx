it('main.tsx loads and renders without crashing', async () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  await import('../src/main.tsx');
});

it('environment check', () => {
  expect(typeof window).toBe('object');
  expect(document).toBeDefined();
});
