import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading } from './Loading';
import { SearchResultsItem } from './SearchResultsItem';
import { Link } from 'react-router-dom';

export const SearchResults = ({ query }) => {
  const [searchItems, setSearchItems] = useState('');
  // const items = [];
  // const url = 'https://api.mercadolibre.com/sites/MLA/search?q=celular';

  // const url = 'http://localhost:3000/items';
  const url = `http://localhost:4000/api/items?q=${encodeURI(query)}`;

  useEffect(() => {
    const getItems = async () => {
      const { data } = await axios.get(url);
      const items = data.items.filter((item, i) => i < 4 && item);
      setSearchItems(items);
    };
    getItems();
  }, [url]);
  // console.log(searchItems);

  if (!searchItems) return <Loading />;
  else
    return (
      <>
        <h1 className="items__breadcrumbs">breadcrums</h1>

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
