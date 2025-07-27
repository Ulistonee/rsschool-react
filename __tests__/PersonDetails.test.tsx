import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
import PersonDetails from '../src/components/person-details/person-details';
import { StarWarsService } from '../src/services/api';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

vi.mock('../src/services/api', () => ({
  StarWarsService: {
    fetchPersonById: vi.fn(),
  },
}));

describe('PersonDetails', () => {
  const mockPerson = {
    name: 'Luke Skywalker',
    height: '172',
    birth_year: '19BBY',
  };

  const renderWithRouter = (id = '1') =>
    render(
      <MemoryRouter initialEntries={[`/person/${id}`]}>
        <Routes>
          <Route path="/person/:id" element={<PersonDetails />} />
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

  it('navigates home when "Back" button is clicked', async () => {
    (
      StarWarsService.fetchPersonById as ReturnType<typeof vi.fn>
    ).mockResolvedValue(mockPerson);

    renderWithRouter();

    const backButton = await screen.findByRole('button', { name: /back/i });
    await userEvent.click(backButton);

    expect(await screen.findByText('Home')).toBeInTheDocument();
  });

  it('navigates to home when clicking outside the container', async () => {
    (
      StarWarsService.fetchPersonById as ReturnType<typeof vi.fn>
    ).mockResolvedValue(mockPerson);

    renderWithRouter();

    await screen.findByText(/Luke Skywalker/);

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });
});
