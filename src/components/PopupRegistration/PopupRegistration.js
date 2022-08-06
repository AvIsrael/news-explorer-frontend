import React from 'react';
import Popup from '../Popup/Popup';
import './PopupRegistration.css';

const PopupRegistration = ({ isVisible, closePopup, switchToSignIn }) => (
  <Popup
    isVisible={isVisible}
    closePopup={closePopup}
    className="registration-popup"
  >
    <h2 className="registration-popup__title">
      Registration successfully completed!
    </h2>
    <button
      type="button"
      onClick={switchToSignIn}
      className="registration-popup__switch-button"
    >
      Sign in
    </button>
  </Popup>
);

export default PopupRegistration;
