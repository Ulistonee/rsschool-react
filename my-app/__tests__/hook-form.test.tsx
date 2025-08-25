import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formsReducer from '../src/store/formsSlice';
import { HookForm } from '../src/components/hook-form/hook-form';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../../utils/fileToBase64.test.ts', () => ({
  fileToBase64: vi.fn().mockResolvedValue('base64string'),
}));

const mockOnSuccess = vi.fn();

const renderWithStore = (ui: React.ReactNode) => {
  const store = configureStore({
    reducer: { forms: formsReducer },
    preloadedState: { forms: { countries: ['USA', 'Canada'] } },
  });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('HookForm', () => {
  beforeEach(() => {
    mockOnSuccess.mockClear();
  });

  it('renders all required fields', () => {
    renderWithStore(<HookForm onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/сonfirm/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('male')).toBeInTheDocument();
    expect(screen.getByDisplayValue('female')).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Picture/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Accept Terms/i })).toBeInTheDocument();
  });

  it('shows validation errors on submit with empty fields', async () => {
    renderWithStore(<HookForm onSuccess={mockOnSuccess} />);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const errors = await screen.findAllByText((content, element) =>
      element?.className.includes('error') && content.trim() !== ''
    );

    expect(errors.length).toBeGreaterThan(0);
  });

  it('calculates password strength correctly', async () => {
    renderWithStore(<HookForm onSuccess={mockOnSuccess} />);

    const passwordInput = screen.getByLabelText(/^Password$/i);

    await userEvent.type(passwordInput, 'abc');
    expect(screen.getByText(/Strength: Weak/i)).toBeInTheDocument();

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Abc123!');
    expect(screen.getByText(/Strength: Strong/i)).toBeInTheDocument();
  });

});
