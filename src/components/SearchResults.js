import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

import { Loading } from './Loading';
import { SearchResultsItem } from './SearchResultsItem';
import { Breadcrumbs } from './Breadcrumbs';

export const SearchResults = ({
  query,
  items: itemsResults,
  onSetItems,
  categories,
  onSetCategories,
}) => {
  const history = useHistory();
  const url = `http://localhost:4000/api/items?q=${query}`;

  try {
    useEffect(() => {
      const getItems = async () => {
        const {
          status,
          data: { items, categories },
        } = await axios.get(url);

        if (status === StatusCodes.OK && items.length === 0) {
          toast.warn('No hay publicaciones que coincidan con tu búsqueda');
          history.replace('/');
          return;
        }

        onSetItems({ status, items });
        onSetCategories(categories);
      };
      getItems();
    }, [url, onSetItems, onSetCategories, history]);

    if (!itemsResults) return <Loading />;
    else
      return (
        <>
          {categories && <Breadcrumbs categories={categories} />}

          <ol className="items__list">
            {itemsResults.items.map((item) => (
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
  } catch (error) {
    console.log(error);
  }
};
