import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import * as React from 'react';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
}

export const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal (
    <div className={styles.container}>
      {children}
    </div>,
    document.body
  )
}
