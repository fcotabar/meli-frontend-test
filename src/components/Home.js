import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBox } from './SearchBox';

import logo from '../assets/img/Logo_ML@2x.png';
import { SearchResults } from './SearchResults';
import { ItemDetail } from './ItemDetail';
import { useEffect } from 'react/cjs/react.development';

export const Home = (props) => {
  const { location, history, match } = props;
  const { id } = match.params;
  const { search } = queryString.parse(location.search);

  const [searchText, setSearchText] = useState('');
  const [itemsCategories, setItemsCategories] = useState([]);
  const [itemsResults, setItemsResults] = useState('');

  useEffect(() => {
    if (!id && !search) setItemsCategories([]);
  }, [id, search, setItemsCategories]);

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim().length > 2) {
      setSearchText('');
      setItemsResults('');
      history.push(`/items?search=${searchText}`);
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
          <ToastContainer />
          <SearchBox
            inputValue={searchText}
            onInputChange={handleSearchInput}
            onSubmitSearch={handleSearch}
          />
        </nav>
      </header>
      <section className="items__results">
        {search && (
          <SearchResults
            query={search}
            items={itemsResults}
            onSetItems={setItemsResults}
            categories={itemsCategories}
            onSetCategories={setItemsCategories}
          />
        )}
        {id && <ItemDetail itemId={id} categories={itemsCategories} />}
      </section>
    </>
  );
};
