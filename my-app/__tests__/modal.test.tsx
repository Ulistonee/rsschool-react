import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../src/components/modal/modal';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';


describe('Modal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders children when open', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.getByText(/Modal content/i)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <div>Hidden content</div>
      </Modal>
    );
    expect(screen.queryByText(/Hidden content/i)).not.toBeInTheDocument();
  });

  it('calls onClose when clicking the close button', async () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );
    await userEvent.click(screen.getByRole('button', { name: /✕/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('closes on Escape key press', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <input placeholder="focus me" />
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('focuses the first focusable element when opened', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <input placeholder="focus me" />
      </Modal>
    );
    const input = screen.getByPlaceholderText(/focus me/i);
    expect(input).toHaveFocus();
  });

  it('closes when clicking outside the modal container', async () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    const overlay = screen.getByTestId('overlay');
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders into a portal (document.body)', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Portal check</div>
      </Modal>
    );
    expect(document.body).toHaveTextContent('Portal check');
  });
});
