import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import PersonDetails from '../src/components/person-details/person-details';
import { StarWarsService } from '../src/services/api';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

vi.mock('../src/services/api', () => ({
  StarWarsService: {
    fetchPersonById: vi.fn(),
  },
}));

describe('PersonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  const mockPerson = {
    name: 'Luke Skywalker',
    height: '172',
    birth_year: '19BBY',
  };

  const renderWithRouter = (id = '1') =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/person?person=${id}`]}>
          <Routes>
            <Route path="/person" element={<PersonDetails />} />
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

  it('shows loading spinner while fetching', async () => {
    (StarWarsService.fetchPersonById as vi.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    renderWithRouter();

    expect(screen.getByText(/loading person details/i)).toBeInTheDocument();
  });

  it('displays personItem data after successful fetch', async () => {
    (StarWarsService.fetchPersonById as vi.Mock).mockResolvedValue(mockPerson);

    renderWithRouter();

    expect(await screen.findByText(/Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172/)).toBeInTheDocument();
    expect(screen.getByText(/Birth year: 19BBY/)).toBeInTheDocument();
  });

  it('displays an error message on fetch failure', async () => {
    (StarWarsService.fetchPersonById as vi.Mock).mockRejectedValue(
      new Error('Failed')
    );

    renderWithRouter();

    expect(await screen.findByText(/Failed/)).toBeInTheDocument();
  });
});
