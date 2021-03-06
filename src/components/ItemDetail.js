import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { formatCurrency } from '../utils/formatCurrency';
import { Loading } from './Loading';
import { Breadcrumbs } from './Breadcrumbs';

export const ItemDetail = ({ itemId, categories }) => {
  const [itemDetail, setItemDetail] = useState('');

  const url = `http://localhost:4000/api/items/${itemId}`;

  useEffect(() => {
    const getItems = async () => {
      const { data } = await axios.get(url);
      setItemDetail(data.item);
    };

    getItems();
  }, [url]);

  const { title, picture, sold_quantity, price, description, condition } =
    itemDetail;

  if (!itemDetail) return <Loading />;
  else
    return (
      <>
        {categories && <Breadcrumbs categories={categories} />}

        <article className="item__content">
          <div className="item__info">
            <picture className="item__image">
              <img alt={title} src={picture} />
            </picture>

            <div className="item__checkout">
              <p className="checkout">
                <span className="checkout__condition">
                  {condition === 'new' && 'Nuevo -'}&nbsp;
                </span>
                <span className="checkout__quantity">
                  {sold_quantity} vendidos
                </span>
              </p>

              <h2 className="checkout__title">{title}</h2>
              <h3 className="checkout__price">
                {formatCurrency(price.amount, price.currency)}{' '}
                <span className="checkout__price--decimal">
                  {price.decimals.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                </span>
              </h3>
              <button className="btn btn--secondary">Comprar</button>
            </div>
          </div>
          <div className="item__description">
            <h4 className="item__description-title">
              Descripción del producto
            </h4>
            <p className="item__description-text">{description}</p>
          </div>
        </article>
      </>
    );
};
