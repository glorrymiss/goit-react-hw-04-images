import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
export const ImageGalleryItem = ({ webformatURL, user, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const openModalWindow = () => setShowModal(true);

  const closeModalWindow = () => setShowModal(false);

  return (
    <ImageItem>
      <Image onClick={openModalWindow} src={webformatURL} alt={user} />
      {showModal && (
        <Modal
          url={largeImageURL}
          user={user}
          closeModalWindow={closeModalWindow}
        />
      )}
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};
