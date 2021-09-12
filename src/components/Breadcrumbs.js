import React from 'react';

export const Breadcrumbs = ({ categories }) => {
  if (categories.length === 0) return '';

  return (
    <nav className="breadcrumbs">
      <div className="breadcrumbs__item-title">Búsquedas relacionadas:</div>
      <ul className="breadcrumbs__item-list">
        {categories.map((cat, i, arr) => (
          <li key={i} className="breadcrumbs__item">
            {cat.trim()}{' '}
            {arr.length !== i + 1 && (
              <span className="breadcrumbs__item-division">|</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
