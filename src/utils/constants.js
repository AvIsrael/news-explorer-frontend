const DEFAULT_USER = {
  data: {
    name: undefined,
  },
  isLoggedIn: false,
  isLoading: false,
  isAuthRequired: false,
};
const DEFAULT_SEARCH = {
  query: undefined,
  results: [],
  isLoading: false,
  isError: false,
};
const DEFAULT_ARTICLES = {
  data: [],
  isLoading: false,
};
const NOTIFICATION_TIME = 3 * 1000;
const RES_INTERVAL = 7 * 24 * 60 * 60 * 1000;
const RES_SIZE = 100;
const API_KEY = '64579af5df1d4305963b5091a4dc1195';
const MAIN_URL = 'https://avi.news.explorer.students.nomoredomainssbs.ru/';
const NEWS_URL = 'https://nomoreparties.co/news/v2';

export {
  API_KEY,
  MAIN_URL,
  NEWS_URL,
  DEFAULT_USER,
  DEFAULT_SEARCH,
  DEFAULT_ARTICLES,
  NOTIFICATION_TIME,
  RES_INTERVAL,
  RES_SIZE,
};
