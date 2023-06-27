import { useEffect, useRef } from 'react';
import { DialogProps } from 'react-html-props';
import { XMarkIcon } from '@heroicons/react/24/solid';
import './modal.css';
import clsx from 'clsx';

export type ModalProps = Omit<DialogProps, 'onClose'> & {
  onClose: () => void;
};

const Modal = ({ children, onClose, open, title, ...props }: ModalProps) => {
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const current = modal.current;
    if (current) {
      if (open && !current.open) current.showModal();
      if (!open && current.open) current.close();
    }
  }, [open]);

  return (
    <dialog className={clsx('modal', open && 'modal--open')} ref={modal} {...props}>
      {title && <h2 className="modal__title">{title}</h2>}
      <div className="modal__content">{children}</div>
      <button className="modal__close" onClick={() => onClose()} type="button">
        <XMarkIcon />
      </button>
    </dialog>
  );
};

export default Modal;
