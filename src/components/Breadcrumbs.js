import React from 'react';

export const Breadcrumbs = ({ categories }) => {
  if (categories.length === 0) return '';

  return (
    <ol className="breadcrumbs">
      <li className="breadcrumbs__item-title">Búsquedas relacionadas:</li>
      {categories.map((cat, i, arr) => (
        <li key={i} className="breadcrumbs__item">
          {cat.trim()}{' '}
          {arr.length !== i + 1 && (
            <span className="breadcrumbs__item-division">|</span>
          )}
        </li>
      ))}
    </ol>
  );
};
