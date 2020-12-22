import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      props.onClose();
      // console.log('escape');
    }
  };

  const handleBbackdropClick = e => {
    if (e.currentTarget === e.target) {
      props.onClose();
      // console.log('backdrop');
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBbackdropClick}>
      <div className={s.Modal}>{props.children}</div>
    </div>,
    modalRoot,
  );
}
