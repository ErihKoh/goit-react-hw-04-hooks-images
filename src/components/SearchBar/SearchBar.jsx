import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';

export default function Searchbar({ onSubmit }) {
  const [imageQuery, setImageQuery] = useState('');

  const handleNameChange = event => {
    setImageQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageQuery.trim() === '') {
      toast.error('Введите запрос.');
      return;
    }

    onSubmit(imageQuery);
    setImageQuery('');
  };

  return (
    <div>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="imageQuery"
            value={imageQuery}
            onChange={handleNameChange}
          />
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
        </form>
      </header>
    </div>
  );
}

Searchbar.propTypes = {
  imageQuery: PropTypes.string,
};
