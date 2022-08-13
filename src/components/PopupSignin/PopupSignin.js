import React, { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Buttons from '../Buttons/Buttons';
import popupForm from '../../hooks/popupform';

const PopupSignin = ({
  isVisible, closePopup, onFormSubmit, switchToSignUp,
}) => {
  const {
    formValues,
    formErrors,
    isFormValid,
    handleInputChange,
    resetForm,
  } = popupForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorResponse, setErrorResponse] = useState(undefined);
  const handleErrorResponse = (err) => {
    if (err.validation) {
      return setErrorResponse(err.validation.body.message);
    }
    return setErrorResponse(err.message);
  };
  const handleAnyResponse = () => setIsLoading(false);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    onFormSubmit(
      {
        email: formValues.email,
        password: formValues.password,
      },
      handleErrorResponse,
      handleAnyResponse,
    );
  };
  useEffect(() => {
    resetForm();
    setErrorResponse(undefined);
  }, [isVisible]);
  return (
    <PopupWithForm isVisible={isVisible} closePopup={closePopup}>
      <h2 className="popup-with-form__title">Sign in</h2>
      <form
        name="signin-form"
        onSubmit={handleFormSubmit}
        noValidate
      >
        <label htmlFor="signin-email" className="popup-with-form__input-group">
          <span className="popup-with-form__input-label">Email</span>
          <input
            id="signin-email"
            name="email"
            value={formValues.email || ''}
            onChange={handleInputChange}
            className="popup-with-form__input"
            type="text"
            autoComplete="off"
            placeholder="Enter email"
            required
            disabled={isLoading}
          />
          {formErrors.email && (
            <p className="popup-with-form__error">
              {formErrors.email}
            </p>
          )}
        </label>
        <label
          htmlFor="signin-password"
          className="popup-with-form__input-group"
        >
          <span className="popup-with-form__input-label">Password</span>
          <input
            id="signin-password"
            name="password"
            value={formValues.password || ''}
            onChange={handleInputChange}
            className="popup-with-form__input"
            type="password"
            minLength="8"
            autoComplete="off"
            placeholder="Enter password"
            required
            disabled={isLoading}
          />
          {formErrors.password && (
            <p className="popup-with-form__error">
              {formErrors.password}
            </p>
          )}
        </label>
        {errorResponse && (
          <p className="popup-with-form__error popup-with-form__error_general">
            {errorResponse}
          </p>
        )}
        <Buttons
          type="submit"
          pattern="primary"
          className="popup-with-form__submit-button"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Buttons>
        <p className="popup-with-form__more-options">
          or
          {' '}
          <button
            type="button"
            onClick={switchToSignUp}
            className="popup-with-form__switch-button"
          >
            Sign up
          </button>
        </p>
      </form>
    </PopupWithForm>
  );
};

export default PopupSignin;
