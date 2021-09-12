const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const getDecimal = (price) => Math.round((price - Math.floor(price)) * 100);

const getItems = (itemsList) => {
  if (itemsList.length === 0) return [];

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
        amount: Math.floor(price),
        decimals: getDecimal(price),
      },
      condition,
      picture: thumbnail,
      free_shipping,
      ubication: city_name,
    };
  });

  return items || [];
};

const getCategories = (itemsList) => {
  const { filters, available_filters } = itemsList;

  if (filters.length === 0 && available_filters.length === 0) return [];

  if (filters.length > 0) {
    return filters[0].values[0].path_from_root.map((cat) => cat.name);
  } else if (available_filters[0].id === 'category') {
    const categories = available_filters[0].values;

    const maxResultId = categories.reduce((prev, curr) =>
      curr.results > prev.results ? curr : prev
    ).id;

    const { name: category } = categories.find((cat) => cat.id === maxResultId);
    return [category];
  }

  return [];
};

/*

https://api.mercadolibre.com/items/:id
https://api.mercadolibre.com/items/:id​/description

 {
    "author": {
      "name": "Francisco",
      "lastname": "Tabares"
    },
    "item": {
      "categories": ["Celulares y Teléfonos", "Celulares y Smartphones"],
      "id": "MLA886405818",
      "title": "Samsung Galaxy A01 Core 16 Gb Negro 1 Gb Ram",
      "price": {
        "currency": "ARS",
        "amount": 15499
      },
      "condition": "new",
      "sold_quantity": 500,
      "picture": "http://http2.mlstatic.com/D_814600-MLA43772081185_102020-O.jpg",
      "description": "Pensado para vos\nEl Samsung A01 Core posee el novedoso sistema operativo Android 10 que incorpora respuestas inteligentes y acciones sugeridas para todas tus aplicaciones. Entre sus diversas funcionalidades encontrarás el tema oscuro, navegación por gestos y modo sin distracciones, para que completes tus tareas mientras disfrutás al máximo tu dispositivo.\n\nMomentos únicos, capturas reales\nCapturá tus mejores momentos y revivilos cuando quieras con la cámara trasera de 8 Mpx.\n\nAdemás, el dispositivo cuenta con cámara frontal de 5 Mpx para que puedas sacarte divertidas selfies o hacer videollamadas.\n\nMás para ver\nCon su pantalla PLS de 5.3 \", disfrutá de colores intensos y mayor nitidez en todos tus contenidos.\n\nBatería para todo el día\nSu batería de 3000 mAh se adapta a tu ritmo de vida y te garantiza energía para toda una jornada con una sola carga.\n\nLlevá lo esencial\nSi buscás un dispositivo que te permita almacenar fotos, videos y archivos indispensables, este celular con 16 GB de memoria interna es para vos.",
      "free_shipping": true
    }
  }



*/

const getItemDetail = (item) => {
  const {
    id,
    title,
    price,
    currency_id: currency,
    condition,
    sold_quantity,
    pictures,
    description,
  } = item;

  return {
    id,
    title,
    price: {
      currency,
      amount: Math.floor(price),
      decimals: getDecimal(price),
    },
    condition,
    sold_quantity,
    picture: pictures[0].url,
    description,
  };
};

app.get('/api/items/:id', async (req, res) => {
  try {
    const { id: itemId } = req.params;
    // console.log(itemId);

    const itemUrl = `https://api.mercadolibre.com/items/${itemId.trim()}`;
    const descriptionUrl = `${itemUrl}/description`;

    const { data: itemData } = await axios.get(itemUrl);

    const {
      data: { plain_text: description },
    } = await axios.get(descriptionUrl);

    const itemDetail = {
      author: {
        name: 'Francisco',
        lastname: 'Tabares',
      },
      item: getItemDetail({ ...itemData, description }),
    };

    res.json(itemDetail);
  } catch (error) {
    // throw new NotFound(error.message);
  }
});

app.get('/api/items', async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
});

app.listen(4000, () => console.log(`Listening on port 4000`));
