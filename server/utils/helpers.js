const getDecimal = (price) => Math.round((price - Math.floor(price)) * 100);

module.exports = { getDecimal };
