import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading } from './Loading';
import { SearchResultsItem } from './SearchResultsItem';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';

export const SearchResults = ({ query, categories, onSetCategories }) => {
  const [searchItems, setSearchItems] = useState('');

  const url = `http://localhost:4000/api/items?q=${encodeURI(query)}`;

  useEffect(() => {
    const getItems = async () => {
      const {
        data: { items, categories },
      } = await axios.get(url);
      console.log(categories);
      setSearchItems(items);
      onSetCategories(categories);
    };
    getItems();
  }, [url, onSetCategories]);
  // console.log(searchItems);

  if (!searchItems) return <Loading />;
  else
    return (
      <>
        {categories && <Breadcrumbs categories={categories} />}

        <ol className="items__list">
          {searchItems.map((item) => (
            <Link
              className="items__link"
              key={item.id}
              to={`/items/${item.id}`}
            >
              <SearchResultsItem item={item} />
            </Link>
          ))}
        </ol>
      </>
    );
};
