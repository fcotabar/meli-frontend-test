const express = require('express');
const router = express.Router();
const axios = require('axios');

const ItemsAdapter = require('../utils/items.adapter');
const {
  author,
  SEARCH_ITEMS_URL,
  ITEMS_DETAIL_URL,
  LIMIT_ITEMS_TO,
} = require('../utils/config');

router.get('/:id', async (req, res) => {
  try {
    const { id: itemId } = req.params;
    // console.log(itemId);

    const itemUrl = `${ITEMS_DETAIL_URL}${itemId.trim()}`;
    const descriptionUrl = `${itemUrl}/description`;

    const { data: itemData } = await axios.get(itemUrl);

    const {
      data: { plain_text: description },
    } = await axios.get(descriptionUrl);

    const itemDetail = {
      author,
      item: ItemsAdapter.getItemDetail({ ...itemData, description }),
    };

    res.json(itemDetail);
  } catch (error) {
    // throw new NotFound(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const { q: query } = req.query;

    const url = `${SEARCH_ITEMS_URL}${query}&limit=${LIMIT_ITEMS_TO}`;

    const { data } = await axios.get(url);

    const object = {
      author,
      categories: ItemsAdapter.getCategories(data),
      items: ItemsAdapter.getItems(data.results),
    };

    res.json(object);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
