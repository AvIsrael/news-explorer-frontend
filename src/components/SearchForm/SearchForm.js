import './SearchForm.css';
import React, { useState } from 'react';
import Buttons from '../Buttons/Buttons';

const SearchForm = () => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => setInputValue(event.target.value);
  return (
    <form className="search-form">
      <input
        name="input"
        value={inputValue}
        onChange={handleInputChange}
        className="search-form__input"
        type="text"
        autoComplete="off"
        placeholder="Enter topic"
        required
      />

      <Buttons
        type="submit"
        pattern="search"
      >
        Search
      </Buttons>
    </form>
  );
};

export default SearchForm;
