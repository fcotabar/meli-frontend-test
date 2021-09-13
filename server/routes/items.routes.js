const express = require('express');
const router = express.Router();
const axios = require('axios');
const { StatusCodes } = require('http-status-codes');

const ItemsAdapter = require('../utils/items.adapter');
const {
  author,
  SEARCH_ITEMS_URL,
  ITEMS_DETAIL_URL,
  LIMIT_ITEMS_TO,
} = require('../utils/config');

axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';

router.get('/:id', async (req, res) => {
  const { id: itemId } = req.params;
  // console.log(itemId);

  const itemUrl = `${ITEMS_DETAIL_URL}${itemId.trim()}`;
  const descriptionUrl = `${itemUrl}/description`;

  const { data: itemData } = await axios.get(itemUrl);

  const {
    data: { plain_text: description },
  } = await axios.get(descriptionUrl).catch((error) => {
    res.status(StatusCodes.BAD_REQUEST).json({
      author,
      error,
      status: StatusCodes.BAD_REQUEST,
    });
  });

  const itemDetail = {
    author,
    item: ItemsAdapter.getItemDetail({ ...itemData, description }),
  };

  res.status(StatusCodes.OK).json(itemDetail);
});

router.get('/', async (req, res) => {
  try {
    const { q: query } = req.query;

    const url = `${SEARCH_ITEMS_URL}${query}&limit=${LIMIT_ITEMS_TO}`;

    const { data } = await axios.get(url).catch((error) => {
      res.status(StatusCodes.BAD_REQUEST).json({
        author,
        error,
        status: StatusCodes.BAD_REQUEST,
      });
    });

    const object = {
      author,
      categories: ItemsAdapter.getCategories(data),
      items: ItemsAdapter.getItems(data.results),
    };

    res.status(StatusCodes.OK).json(object);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
