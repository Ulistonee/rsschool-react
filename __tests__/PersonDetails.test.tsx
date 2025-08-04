import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
import PersonDetails from '../src/components/person-details/person-details';
import { StarWarsService } from '../src/services/api';
import '@testing-library/jest-dom';

vi.mock('../src/services/api', () => ({
  StarWarsService: {
    fetchPersonById: vi.fn(),
  },
}));

describe.skip('PersonDetails', () => {
  const mockPerson = {
    name: 'Luke Skywalker',
    height: '172',
    birth_year: '19BBY',
  };

  const renderWithRouter = (id = '1') =>
    render(
      <MemoryRouter initialEntries={[`/person?person=${id}`]}>
        <Routes>
          <Route path="/person" element={<PersonDetails />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    );

  it('shows loading spinner while fetching', async () => {
    (
      StarWarsService.fetchPersonById as ReturnType<typeof vi.fn>
    ).mockImplementation(() => new Promise(() => {}));

    renderWithRouter();

    expect(screen.getByText(/loading person details/i)).toBeInTheDocument();
  });

  it('displays person data after successful fetch', async () => {
    (
      StarWarsService.fetchPersonById as ReturnType<typeof vi.fn>
    ).mockResolvedValue(mockPerson);

    renderWithRouter();

    expect(await screen.findByText(/Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172/)).toBeInTheDocument();
    expect(screen.getByText(/Birth year: 19BBY/)).toBeInTheDocument();
  });

  it('displays an error message on fetch failure', async () => {
    (
      StarWarsService.fetchPersonById as ReturnType<typeof vi.fn>
    ).mockRejectedValue(new Error('Failed'));

    renderWithRouter();

    expect(await screen.findByText(/Failed/)).toBeInTheDocument();
  });
});
