import { useState } from 'react';
import { Modal } from '../../components/modal/modal';
import { UncontrolledForm } from '../../components/uncontrolled-form/uncontrolled-form';
import { HookForm } from '../../components/hook-form/hook-form';
import { messages } from '../../messages/messages.ts';
import styles from './main-page.module.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { Tile } from '../../components/tile/tile.tsx';

enum ModalType {
  Uncontrolled = 'uncontrolled',
  Hook = 'hook',
}

export const MainPage = () => {
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const uncontrolledData = useSelector((state: RootState) => state.forms.uncontrolled);
  const hookData = useSelector((state: RootState) => state.forms.hook);

  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <main>
        <section className={styles.buttonContainer}>
          <button onClick={() => openModal(ModalType.Uncontrolled)}>{messages.buttons.unconrolled}</button>
          <button onClick={() => openModal(ModalType.Hook)}>{messages.buttons.hookForm}</button>
          <Modal isOpen={modalType !== null} onClose={closeModal}>
            {modalType === ModalType.Uncontrolled && <UncontrolledForm  onSuccess={closeModal} />}
            {modalType === ModalType.Hook && <HookForm  onSuccess={closeModal} />}
          </Modal>
        </section>
        <section className={styles.tiles}>
          <Tile data={uncontrolledData}/>
          <Tile data={hookData}/>
        </section>
    </main>
  );
};
