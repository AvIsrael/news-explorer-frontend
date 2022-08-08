import React from 'react';
import './NothingFound.css';
import notFoundImg from '../../images/notfound-result.svg';

const NothingFound = ({ children }) => (
  <div className="nothing-found">
    <img src={notFoundImg} alt="nothing found icon" className="nothing-found__image" />
    <h2 className="nothing-found__title">
      Nothing found
    </h2>
    <p className="nothing-found__description">
      {children}
    </p>
  </div>
);

export default NothingFound;
