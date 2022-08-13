import React, { useState, useEffect } from 'react';
import {
  Navigate, Route, Routes, useNavigate, useLocation,
} from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import PopupSignin from '../PopupSignin/PopupSignin';
import PopupSignup from '../PopupSignup/PopupSignup';
import PopupRegistration from '../PopupRegistration/PopupRegistration';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Notify from '../Notify/notify';
import CurrentUserContext from '../../context/CurrentUserContext';
import MainApi from '../../utils/MainApi';
import NewsApi from '../../utils/NewsApi';
import {
  DEFAULT_USER,
  DEFAULT_SEARCH,
  DEFAULT_ARTICLES,
  NOTIFICATION_TIME,
} from '../../utils/constants';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({
    ...DEFAULT_USER, isAuthRequired: !!localStorage.getItem('jwt'),
  });
  const [lastSearch, setLastSearch] = useState(() => {
    const storedLastSearch = localStorage.getItem('lastSearch');
    if (storedLastSearch) {
      return JSON.parse(storedLastSearch);
    }
    return DEFAULT_SEARCH;
  });
  const [savedArticles, setSavedArticles] = useState(DEFAULT_ARTICLES);
  const [shownResults, setShownResults] = useState([]);
  const [remainingResults, setRemainingResults] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(undefined);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationTimeout, setNotificationTimeout] = useState(undefined);
  const [isSignInPopupVisible, setIsSignInPopupVisible] = useState(false);
  const [isSignUpPopupVisible, setIsSignUpPopupVisible] = useState(false);
  const [isRegSuccessfulPopupVisible, setIsRegSuccessfulPopupVisible] = useState(false);

  const Notification = (message) => {
    setNotificationMessage(message);
    setIsNotificationVisible(true);
    clearTimeout(notificationTimeout);
    setNotificationTimeout(setTimeout(() => {
      setIsNotificationVisible(false);
    }, NOTIFICATION_TIME));
  };
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

  const updateCurrentUser = () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setCurrentUser(DEFAULT_USER);
      return;
    }
    setCurrentUser({ ...DEFAULT_USER, isLoading: true });
    MainApi.getCurrentUser(token)
      .then((response) => setCurrentUser({
        ...DEFAULT_USER,
        data: response,
        isLoggedIn: true,
      }))
      .catch(() => setCurrentUser(DEFAULT_USER));
  };

  const handleSignInSubmit = (formValues, onErrorResponse, onAnyResponse) => {
    MainApi.signIn(formValues)
      .then((response) => {
        localStorage.setItem('jwt', response.token);
        setCurrentUser({ ...DEFAULT_USER, isAuthRequired: true });
        closeAllPopups();
      })
      .catch(onErrorResponse)
      .finally(onAnyResponse);
  };

  const handleSignUpSubmit = (formValues, onErrorResponse, onAnyResponse) => {
    MainApi.signUp(formValues)
      .then(openRegSuccessfulPopup)
      .catch(onErrorResponse)
      .finally(onAnyResponse);
  };
  const handleLogoutClick = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(DEFAULT_USER);
    navigate('/');
  };
  const handleSearchSubmit = (searchQuery) => {
    setLastSearch({
      ...DEFAULT_SEARCH,
      query: searchQuery,
      isLoading: true,
    });
    NewsApi.searchNews(searchQuery)
      .then((response) => setLastSearch({
        ...DEFAULT_SEARCH,
        query: searchQuery,
        results: response.articles,
      }))
      .catch(() => setLastSearch({
        ...DEFAULT_SEARCH,
        query: searchQuery,
        isError: true,
      }));
  };

  const handleLoadingInitialResults = () => {
    setShownResults(lastSearch.results.slice(0, 3));
    setRemainingResults(lastSearch.results.slice(3));
  };
  const handleLoadMoreClick = () => {
    setShownResults([...shownResults, ...remainingResults.slice(0, 3)]);
    setRemainingResults(remainingResults.slice(3));
  };
  const updateSavedArticles = () => {
    setSavedArticles({
      ...DEFAULT_ARTICLES,
      isLoading: true,
    });
    MainApi.getSavedArticles()
      .then((res) => setSavedArticles({
        ...DEFAULT_ARTICLES,
        data: res,
      }))
      .catch(() => setSavedArticles(DEFAULT_ARTICLES));
  };

  const handleBookmarkClick = (articleData, setSavedArticleId) => {
    MainApi.saveArticle({ ...articleData, keyword: lastSearch.query })
      .then((res) => {
        setSavedArticles({
          ...savedArticles, data: [...savedArticles.data, res],
        });
        setSavedArticleId(res._id);
      })
      .catch((error) => Notification(error.message));
  };
  const handleRemoveClick = (savedArticleId, setSavedArticleId) => {
    MainApi.deleteArticle(savedArticleId)
      .then(() => {
        setSavedArticles({
          ...savedArticles,
          data: savedArticles.data.filter((articleData) => articleData._id !== savedArticleId),
        });
        setSavedArticleId(undefined);
      })
      .catch((err) => Notification(err.message));
  };

  useEffect(() => {
    if (currentUser.isAuthRequired) {
      updateCurrentUser();
    }
    if (currentUser.isLoggedIn) {
      updateSavedArticles();
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lastSearch', JSON.stringify(lastSearch));
    if (lastSearch.query) {
      handleLoadingInitialResults();
    }
  }, [lastSearch]);

  useEffect(() => {
    if (location.state && location.state.openSignIn) {
      openSignInPopup();
      navigate({
        state: { openSignIn: false },
      });
    }
  }, [location]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={(
            <Main
              lastSearch={lastSearch}
              savedArticles={savedArticles}
              shownResults={shownResults}
              onSearchSubmit={handleSearchSubmit}
              onSignInClick={openSignInPopup}
              onSignUpClick={openSignUpPopup}
              onSignOutClick={handleLogoutClick}
              onBookmarkClick={handleBookmarkClick}
              onRemoveClick={handleRemoveClick}
              onLoadMoreClick={remainingResults.length > 0 && handleLoadMoreClick}
            />
                    )}
        />
        <Route
          path="/saved-news"
          element={(
            <ProtectedRoute>
              <SavedNews
                savedArticles={savedArticles}
                onSignOutClick={handleLogoutClick}
                onRemoveClick={handleRemoveClick}
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

      <Notify
        message={notificationMessage}
        isVisible={isNotificationVisible}
      />

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
