import { useState } from 'react';
import { Modal } from '../../components/modal/modal';
import { UncontrolledForm } from '../../components/uncontrolled-form/uncontrolled-form';
import { HookForm } from '../../components/hook-form/hook-form';
import { messages } from '../../messages/messages.ts';
import styles from './main-page.module.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';

export const MainPage = () => {
  const [modalType, setModalType] = useState<'uncontrolled' | 'hook' | null>(null);

  const uncontrolledData = useSelector((state: RootState) => state.forms.uncontrolled);
  const hookData = useSelector((state: RootState) => state.forms.hook);

  const openModal = (type: 'uncontrolled' | 'hook') => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <main>
        <section className={styles.buttonContainer}>
          <button onClick={() => openModal('uncontrolled')}>{messages.buttons.unconrolled}</button>
          <button onClick={() => openModal('hook')}>{messages.buttons.hookForm}</button>
          <Modal isOpen={modalType !== null} onClose={closeModal}>
            {modalType === 'uncontrolled' && <UncontrolledForm />}
            {modalType === 'hook' && <HookForm />}
          </Modal>
        </section>
        <section className={styles.tiles}>
          <h3 className={styles.tilesHeading}>Uncontrolled Form Data</h3>
          <div className={styles.tilesGrid}>
            {uncontrolledData.map((item, i) => (
              <div key={i} className={styles.tile}>
                <p><b>{item.name}</b></p>
                <p>{item.email}</p>
              </div>
            ))}
          </div>

          <h3 className={styles.tilesHeading}>Hook Form Data</h3>
          <div className={styles.tilesGrid}>
            {hookData.map((item, i) => (
              <div key={i} className={styles.tile}>
                <p><b>{item.name}</b></p>
                <p>{item.email}</p>
              </div>
            ))}
          </div>
        </section>
    </main>
  );
};
