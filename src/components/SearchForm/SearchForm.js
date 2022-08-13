import './SearchForm.css';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Buttons from '../Buttons/Buttons';
import popupForm from '../../hooks/popupform';

const SearchForm = ({ lastSearch, onSearchSubmit }) => {
  const {
    formValues,
    formErrors,
    isFormValid,
    handleInputChange,
    resetForm,
    validateFormOnSubmit,
  } = popupForm();
  const [lastError, setLastError] = useState(undefined);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    validateFormOnSubmit(event);
    if (isFormValid) {
      onSearchSubmit(formValues.query);
    }
  };

  useEffect(() => {
    if (lastSearch.query) {
      resetForm({
        query: lastSearch.query,
      });
    }
  }, [lastSearch]);

  useEffect(() => {
    if (formErrors.query) {
      setLastError(formErrors.query);
    }
  }, [formErrors]);

  return (
    <form
      className="search-form"
      onSubmit={handleFormSubmit}
      name="search-form"
      noValidate
    >
      <input
        name="query"
        value={formValues.query || ''}
        onChange={handleInputChange}
        className="search-form__input"
        type="text"
        autoComplete="off"
        placeholder="Enter topic"
        required
        disabled={lastSearch.isLoading}
      />

      <p
        className={classNames(
          'search-form__input-error',
          formErrors.query && 'search-form__input-error_visible',
        )}
      >
        {lastError}
      </p>

      <Buttons
        type="submit"
        pattern="search"
        disabled={lastSearch.isLoading || formErrors.query}
      >
        Search
      </Buttons>
    </form>
  );
};

export default SearchForm;
