import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formsReducer from '../src/store/formsSlice';
import { UncontrolledForm } from '../src/components/uncontrolled-form/uncontrolled-form';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const mockOnSuccess = vi.fn();

const renderWithStore = (ui: React.ReactNode) => {
  const store = configureStore({ reducer: { forms: formsReducer } });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('UncontrolledForm', () => {
  beforeEach(() => {
    mockOnSuccess.mockClear();
  });

  it('renders all required fields', () => {
    renderWithStore(<UncontrolledForm onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('male')).toBeInTheDocument();
    expect(screen.getByDisplayValue('female')).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Picture/i)).toBeInTheDocument();
  });

  it('shows validation errors on submit with empty fields', async () => {
    renderWithStore(<UncontrolledForm onSuccess={mockOnSuccess} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    const ageField = screen.getByLabelText(/Age/i).closest('div')!;
    expect(
      await within(ageField).findByText(/Invalid input|Age is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at least/i)).toBeInTheDocument();
  });

  it('calculates password strength on input', () => {
    renderWithStore(<UncontrolledForm onSuccess={mockOnSuccess} />);

    const passwordInput = screen.getByLabelText(/^Password$/i);
    fireEvent.input(passwordInput, { target: { value: 'abc' } });
    expect(screen.getByText(/Strength: Weak/i)).toBeInTheDocument();

    fireEvent.input(passwordInput, { target: { value: 'Abc123!' } });
    expect(screen.getByText(/Strength: Strong/i)).toBeInTheDocument();
  });
});
