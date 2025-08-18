import { useState, useRef } from 'react';
import { Modal } from '../../components/modal/modal';
import { UncontrolledForm } from '../../components/uncontrolled-form/uncontrolled-form';
import { HookForm } from '../../components/hook-form/hook-form';
import { messages } from '../../messages/messages.ts';
import styles from './main-page.module.css';

export const MainPage = () => {
  const [modalType, setModalType] = useState<'uncontrolled' | 'hook' | null>(null);

  const openModal = (type: 'uncontrolled' | 'hook') => {
    setModalType(type);
  };

  return (
    <main className={styles.container}>
      <section className={styles.buttonContainer}>
        <button onClick={() => openModal('uncontrolled')}>{messages.buttons.unconrolled}</button>
        <button onClick={() => openModal('hook')}>{messages.buttons.hookForm}</button>
        <Modal isOpen={modalType === 'uncontrolled'}>
          <UncontrolledForm/>
        </Modal>
        <Modal isOpen={modalType === 'hook'}>
          <HookForm/>
        </Modal>
      </section>
    </main>
  );
};
