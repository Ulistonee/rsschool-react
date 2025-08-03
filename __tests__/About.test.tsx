import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, expect, describe, it } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import About from '../src/pages/about/about';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../src/context/theme-context';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('About component', () => {
  const renderWithProviders = () =>
    render(
      <MemoryRouter>
        <ThemeProvider>
          <About />
        </ThemeProvider>
      </MemoryRouter>
    );
  it('renders all the content', () => {
    renderWithProviders();

    expect(screen.getByText(/About This App/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Star Wars character search demo/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Aizhan/i)).toBeInTheDocument();
    expect(screen.getByText(/Kazakhstan/i)).toBeInTheDocument();
    expect(
      screen.getByText(/React, TypeScript, React Router, CSS Modules/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /RSSchool website/i })
    ).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
  });

  it('navigates home on "Back" button click', async () => {
    const navigateMock = vi.fn();
    (useNavigate as unknown as vi.Mock).mockReturnValue(navigateMock);

    renderWithProviders();

    const backButton = screen.getByRole('button', { name: /Back/i });
    await userEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
