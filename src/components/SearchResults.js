import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading } from './Loading';

export const SearchResults = ({ query }) => {
  const [searchItems, setSearchItems] = useState('');
  // const items = [];
  // const url = 'https://api.mercadolibre.com/sites/MLA/search?q=celular';

  const url = 'http://localhost:3000/items';

  useEffect(() => {
    const getItems = async () => {
      const { data } = await axios.get(url);
      const items = data.items.filter((item, i) => i < 4 && item);
      setSearchItems(items);
    };
    // axios
    //   .get('http://localhost:3000/items')
    //   .then((res) => {
    //     // console.log(res.data);
    //     setSearchItems(res.data.items);
    //     console.log(searchItems);
    //     // return res.json();
    //   })
    //   .catch((err) => console.log(err));
    getItems();
  }, []);
  console.log(searchItems);

  return <>{!searchItems ? <Loading /> : <h1>Some results... {query}</h1>}</>;
};
