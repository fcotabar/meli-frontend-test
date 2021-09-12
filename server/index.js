const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const getItems = (itemsList) => {
  const items = itemsList.map((item) => {
    const {
      id,
      title,
      price,
      currency_id,
      condition,
      thumbnail,
      shipping: { free_shipping },
      address: { city_name },
    } = item;
    return {
      id,
      title,
      price: {
        currency: currency_id,
        amount: price,
      },
      condition,
      picture: thumbnail,
      free_shipping,
      ubication: city_name,
    };
  });

  return items || 'Not found';
};

const getCategories = (itemsList) => {
  const { filters, available_filters } = itemsList;

  if (filters.length > 0) {
    return filters[0].values[0].path_from_root.map((cat) => cat.name);
  } else if (available_filters[0].id === 'category') {
    let maxResult = 0;
    let maxResultId = '';
    const categories = available_filters[0].values;

    categories.forEach((cat) => {
      if (maxResult < cat.results) {
        maxResult = cat.results;
        maxResultId = cat.id;
      }
    });
    const { name: category } = categories.find((cat) => cat.id === maxResultId);
    return [category];
  }

  return [];
};

app.get('/api/items', async (req, res) => {
  // console.log(req.query);
  // console.log(res);

  const { q: query } = req.query;

  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`;

  const { data } = await axios.get(url);

  const object = {
    author: {
      name: 'Francisco',
      lastname: 'Tabares',
    },
    categories: getCategories(data),
    items: getItems(data.results),
  };

  res.json(object);
});

app.listen(4000);

/**
 *
 * 
 * "filters": [
        {
            "id": "category",
            "name": "Categories",
            "type": "text",
            "values": [
                {
                    "id": "MLA1055",
                    "name": "Celulares y Smartphones",
                    "path_from_root": [
                        {
                            "id": "MLA1051",
                            "name": "Celulares y Teléfonos"
                        },
                        {
                            "id": "MLA1055",
                            "name": "Celulares y Smartphones"
                        }
                    ]
                }
            ]
        }
 * 
 * 
 * 
 *     "filters": [],
    "available_filters": [
        {
            "id": "category",
            "name": "Categories",
            "type": "text",
            "values": [
 * 
 * 
 * 
 */
