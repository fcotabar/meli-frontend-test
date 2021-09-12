const author = { name: 'Francisco', lastname: 'Tabares' };

const PORT = 4000;

const SEARCH_ITEMS_URL = 'https://api.mercadolibre.com/sites/MLA/search?q=';

const ITEMS_DETAIL_URL = 'https://api.mercadolibre.com/items/';

const LIMIT_ITEMS_TO = 4;

module.exports = {
  author,
  PORT,
  SEARCH_ITEMS_URL,
  ITEMS_DETAIL_URL,
  LIMIT_ITEMS_TO,
};
