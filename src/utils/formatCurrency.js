import getSymbolFromCurrency from 'currency-symbol-map';

export const formatCurrency = (amount, currency) => {
  const money = new Intl.NumberFormat('es-AR', {
    currency: currency || 'ARS',
    style: 'decimal',
  }).format(amount || 0);
  const symbol = getSymbolFromCurrency(currency);
  return `${symbol} ${money}`;
};
