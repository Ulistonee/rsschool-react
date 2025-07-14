import { render, screen } from '@testing-library/react';
import App from '../src/App.tsx';

test('рендерит компонент App и отображает поле поиска и результаты', () => {
  render(<App />);
  expect(screen.getByRole('textbox')).toBeInTheDocument(); // input из Search
  expect(screen.getByTestId('error-thrower')).toBeInTheDocument(); // из Results
});
