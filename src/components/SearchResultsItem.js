import React from 'react';
import freeShipping from '../assets/img/ic_shipping.png';
import { formatCurrency } from '../utils/formatCurrency';

export const SearchResultsItem = ({ item }) => {
  // console.log(item);
  const { picture, title, price, free_shipping, ubication } = item;
  return (
    <li className="list-item">
      <figure className="list-item__picture">
        <img src={picture} alt={title} />
      </figure>
      <span className="list-item__info">
        <h3 className="list-item__price">
          {formatCurrency(price.amount, price.currency)}
          {free_shipping && <img src={freeShipping} alt="Free shipping" />}
        </h3>
        <h2 className="list-item__title">{title}</h2>
      </span>
      <span className="list-item__location">{ubication}</span>
    </li>
  );
};
