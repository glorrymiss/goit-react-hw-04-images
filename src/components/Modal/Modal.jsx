import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';
export const Modal = ({ url, user, closeModalWindow }) => {
  useEffect(() => {
    const handleKeydown = event => {
      if (event.code === 'Escape') {
        closeModalWindow();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [closeModalWindow]);

  const hendleClose = event => {
    if (event.currentTarget === event.target) {
      closeModalWindow();
    }
  };

  return (
    <Overlay onClick={hendleClose}>
      <ModalWindow>
        <img src={url} alt={user} />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  closeModalWindow: PropTypes.func.isRequired,
};
