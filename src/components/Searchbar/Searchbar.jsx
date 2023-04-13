import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

import {
  Header,
  SearchForm,
  SearchFormButton,
  FormInput,
} from './Searchbar.styled';

export const Searchbar = ({ submit }) => {
  const [nameValue, setNameValue] = useState('');

  const hendleInput = event => {
    setNameValue(event.currentTarget.value.toLowerCase());
  };

  const hendleSubmit = event => {
    event.preventDefault();

    if (nameValue.trim() === '') {
      Notiflix.Notify.failure('Please enter the word');

      return;
    }

    submit(nameValue);
  };

  return (
    <Header>
      <SearchForm onSubmit={hendleSubmit}>
        <SearchFormButton type="submit">
          <FaSearch />
        </SearchFormButton>

        <FormInput
          name="nameValue"
          value={nameValue}
          onChange={hendleInput}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  submit: PropTypes.func.isRequired,
};
