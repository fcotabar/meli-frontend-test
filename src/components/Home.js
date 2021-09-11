import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import { SearchBox } from './SearchBox';

import logo from '../assets/img/Logo_ML@2x.png';
import { SearchResults } from './SearchResults';
import { ItemDetail } from './ItemDetail';

/**
 * CajadeBúsqueda:“/”
 * Resultadosdelabúsqueda:“/items?search=”
 * Detalledelproducto:“/items/:id”
 * @param {*} props
 * @returns
 */

export const Home = (props) => {
  // console.log(props);
  const { location, history, match } = props;

  const { id } = match.params;
  console.log(id);

  const { search } = queryString.parse(location.search);
  console.log(search);

  const [searchText, setSearchText] = useState('');

  const handleSearchInput = (e) => {
    // console.log(e);
    setSearchText(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim().length > 2) {
      // console.log('searching....');
      history.push(`/items?search=${encodeURI(searchText)}`);
    }
  };

  return (
    <>
      <header className="header">
        <nav className="search__nav">
          <Link to="/">
            <img
              className="search__nav-logo"
              src={logo}
              alt="Logo Mercado Libre"
            />
          </Link>
          <SearchBox
            inputValue={searchText}
            onInputChange={handleSearchInput}
            onSubmitSearch={handleSearch}
          />
        </nav>
      </header>
      <section className="items__results">
        {search && <SearchResults query={search} />}
        {id && <ItemDetail itemId={id} />}
      </section>
    </>
  );
};
