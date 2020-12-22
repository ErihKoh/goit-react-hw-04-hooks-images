import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import ButtonLoadMore from './components/Button';
import Modal from './components/Modal';
import imageApi from './services/image-api';
import './App.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageQuery, setImageQuery] = useState('');
  const [largeImage, setLargetImages] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imageQuery === '') {
      return;
    }

    // const fetchImage = () => {
    const options = {
      currentPage,
      imageQuery,
    };
    setIsloading(true);
    imageApi
      .fetchImage(options)
      .then(({ hits }) => setImages([...images, ...hits]))
      .then(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => setError(error))
      .finally(() => setIsloading(false));
    // };

    // fetchImage();
  }, [currentPage, imageQuery]);

  const onClickImage = e => {
    e.preventDefault();
    if (e.target.nodeName === 'IMG') {
      setLargetImages(e.target.dataset.image);
    }
  };

  const handleFormSubmit = query => {
    setImageQuery(query);
    setCurrentPage(1);
    setImages([]);
  };

  const toggleModal = () => {
    setLargetImages('');
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onClick={onClickImage} />
      <div className="spinner">
        {isLoading && (
          <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
        )}
      </div>
      {images.length > 0 && (
        <ButtonLoadMore onClick={() => setCurrentPage(currentPage + 1)} />
      )}
      {largeImage && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="modal" />
        </Modal>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

App.propTypes = {
  imageQuery: PropTypes.string,
  images: PropTypes.array,
  currentPage: PropTypes.number,
  isLoading: PropTypes.bool,
};
