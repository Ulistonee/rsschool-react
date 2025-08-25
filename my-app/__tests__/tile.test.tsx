import { render, screen } from '@testing-library/react';
import { Tile } from '../src/components/tile/tile';
import type { FormData } from '../src/store/formsSlice';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Tile component', () => {
  const sampleData: FormData[] = [
    {
      name: 'John Doe',
      age: '30',
      email: 'john@example.com',
      gender: 'male',
      country: 'United States',
      picture: 'image.png',
    },
    {
      name: 'Jane Smith',
      age: '25',
      email: 'jane@example.com',
      gender: 'female',
      country: 'Canada',
      picture: 'image2.png',
    },
  ];

  it('renders the heading', () => {
    render(<Tile data={sampleData} />);
    expect(screen.getByText(/Uncontrolled Form Data/i)).toBeInTheDocument();
  });

  it('renders all data items', () => {
    render(<Tile data={sampleData} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('does not apply highlight if highlightIndex is null', () => {
    render(<Tile data={sampleData} highlightIndex={null} />);
    const firstTile = screen.getByText('John Doe').closest('div');
    const secondTile = screen.getByText('Jane Smith').closest('div');
    expect(firstTile).not.toHaveClass('highlight');
    expect(secondTile).not.toHaveClass('highlight');
  });
});
