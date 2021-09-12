const helpers = require('./helpers');

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
        decimals: helpers.getDecimal(price),
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
      decimals: helpers.getDecimal(price),
    },
    condition,
    sold_quantity,
    picture: pictures[0].url,
    description,
  };
};

module.exports = {
  getItems,
  getCategories,
  getItemDetail,
};
