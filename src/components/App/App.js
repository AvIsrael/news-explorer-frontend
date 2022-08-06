import React, { useState } from 'react';
import {
  Navigate, Route, Routes, useNavigate,
} from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import PopupSignin from '../PopupSignin/PopupSignin';
import PopupSignup from '../PopupSignup/PopupSignup';
import PopupRegistration from '../PopupRegistration/PopupRegistration';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../context/CurrentUserContext';
import { defaultUser, defaultAuthorUser } from '../../utils/constants';

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isSignInPopupVisible, setIsSignInPopupVisible] = useState(false);
  const [isSignUpPopupVisible, setIsSignUpPopupVisible] = useState(false);
  const [isRegSuccessfulPopupVisible, setIsRegSuccessfulPopupVisible] = useState(false);

  const closeAllPopups = () => React.startTransition(() => {
    setIsSignInPopupVisible(false);
    setIsSignUpPopupVisible(false);
    setIsRegSuccessfulPopupVisible(false);
  });

  const openSignInPopup = () => React.startTransition(() => {
    closeAllPopups();
    setIsSignInPopupVisible(true);
  });

  const openSignUpPopup = () => React.startTransition(() => {
    closeAllPopups();
    setIsSignUpPopupVisible(true);
  });

  const openRegSuccessfulPopup = () => React.startTransition(() => {
    closeAllPopups();
    setIsRegSuccessfulPopupVisible(true);
  });

  const handleSignInSubmit = (formValues, onSuccess) => {
    setTimeout(() => {
      setCurrentUser(defaultAuthorUser);
      closeAllPopups();
      onSuccess();
    }, 1500);
  };

  const handleSignUpSubmit = (formValues, onSuccess) => {
    setTimeout(() => {
      closeAllPopups();
      openRegSuccessfulPopup();
      onSuccess();
    }, 1500);
  };

  const handleLogoutClick = () => {
    setCurrentUser(defaultUser);
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={(
            <Main
              onSignInClick={openSignInPopup}
              onSignOutClick={handleLogoutClick}
            />
                    )}
        />
        <Route
          path="/saved-news"
          element={(
            <ProtectedRoute>
              <SavedNews
                onSignOutClick={handleLogoutClick}
              />
            </ProtectedRoute>
                    )}
        />
        <Route
          path="*"
          element={(
            <Navigate to="/" />
                    )}
        />
      </Routes>

      <PopupSignin
        isVisible={isSignInPopupVisible}
        closePopup={closeAllPopups}
        onFormSubmit={handleSignInSubmit}
        switchToSignUp={openSignUpPopup}
      />

      <PopupSignup
        isVisible={isSignUpPopupVisible}
        closePopup={closeAllPopups}
        onFormSubmit={handleSignUpSubmit}
        switchToSignIn={openSignInPopup}
      />

      <PopupRegistration
        isVisible={isRegSuccessfulPopupVisible}
        closePopup={closeAllPopups}
        switchToSignIn={openSignInPopup}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
