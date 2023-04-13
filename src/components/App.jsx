import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

import { Loader } from './Loader/Loader';
import { Container } from './App.styled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameValue, setNameValue] = useState('');

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [hasBtn, setHasBtn] = useState(false);

  const URL = 'https://pixabay.com/api/';
  const KEY = '33635231-9592dead0045fe81be9248485';

  useEffect(() => {
    if (nameValue) {
      setLoading(true);

      fetch(
        `${URL}?q=${nameValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`Sorry, not found`));
        })
        .then(data => {
          if (data.hits.length <= 0) {
            Notiflix.Notify.failure(
              ' Find nothing... Please input correct value'
            );
            return;
          }
          setImages(prevState => [...prevState, ...data.hits]);
          setHasBtn(true);

          const pages = Math.ceil(data.totalHits / perPage);
          if (page === pages) setHasBtn(false);
        })

        .catch(error => console.log(error))

        .finally(() => setLoading(false));
    }
  }, [nameValue, page, perPage]);

  const hendleLoad = () => {
    setPage(prevState => prevState + 1);
  };

  const hendleTakeSubmit = nameValue => {
    setNameValue(nameValue);
    setImages([]);
    setPage(1);
    setPerPage(perPage);
  };

  return (
    <Container>
      <Searchbar submit={hendleTakeSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length > 0 && hasBtn && <Button onChange={hendleLoad} />}
      {loading && <Loader />}
    </Container>
  );
};
