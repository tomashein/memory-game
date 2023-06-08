import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import styles from './modal.module.css';

type ModalType = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  open: boolean;
  onClose: (value: boolean) => void;
};

const Modal = ({ children, title, description, open, onClose }: ModalType) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className={styles.modal_overlay} aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95">
          <div className={styles.modal_container}>
            <Dialog.Panel className={styles.modal_panel}>
              {title ? (
                <Dialog.Title as="h2" className={styles.modal_title}>
                  {title}
                </Dialog.Title>
              ) : null}
              {description ? <Dialog.Description>{description}</Dialog.Description> : null}
              <div className={styles.modal_content}>{children}</div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
