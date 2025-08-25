import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import * as React from 'react';
import { useEffect, useRef } from 'react';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusable = modalRef.current.querySelector<HTMLElement>(
        'input, button, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }
  }, [isOpen, children]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal (
    <div data-testid="overlay"  className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.container} ref={modalRef}>
        {children}
        <button onClick={onClose}>
          ✕
        </button>
      </div>
    </div>,
    document.body
  )
}
