import React from 'react';
import './NewsCardsListError.css';

const NewsCardsListError = ({ children }) => (
  <div className="news-card-list_error">
    <h2 className="news-card-list-error__title">
      Error
    </h2>

    <p className="news-card-list-error__description">
      {children}
    </p>
  </div>
);

export default NewsCardsListError;
