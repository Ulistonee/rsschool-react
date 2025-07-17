import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../src/components/card/card';

describe('Card/Item Component Tests', () => {
  it('Displays item name and description correctly', () => {
    const name = 'Luke Skywalker';
    const description = 'Height: 172 см, Year of birth: 19BBY';

    render(<Card name={name} description={description} />);

    expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
