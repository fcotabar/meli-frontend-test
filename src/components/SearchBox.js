import React from 'react';
import searchIcon from '../assets/img/ic_Search@2x.png';

export const SearchBox = ({ inputValue, onInputChange, onSubmitSearch }) => {
  return (
    <form onSubmit={onSubmitSearch} className="search__nav-form">
      <input
        className="search__nav-input"
        value={inputValue}
        onChange={onInputChange}
        placeholder="Ingresa tu búsqueda..."
      />
      <button className="search__nav-btn">
        <img src={searchIcon} alt="Search Icon" className="search__nav-icon" />
      </button>
    </form>
  );
};
