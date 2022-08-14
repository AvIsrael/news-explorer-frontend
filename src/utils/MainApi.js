import Api from './api';
import { MAIN_URL } from './constants';

class MainApi extends Api {
  _authToken = undefined;

  signUp({ email, password, name }) {
    return this.sendReq('/signup', 'POST', {
      body: JSON.stringify({ email, password, name }),
    });
  }

  signIn({ email, password }) {
    return this.sendReq('/signin', 'POST', {
      body: JSON.stringify({ email, password }),
    });
  }

  getCurrentUser(token) {
    this._setAuthToken(token);
    return this._sendReqWithAuth('/users/me');
  }

  getSavedArticles() {
    return this._sendReqWithAuth('/articles');
  }

  saveArticle({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  }) {
    return this._sendReqWithAuth('/articles', 'POST', {
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    });
  }

  deleteArticle(id) {
    return this._sendReqWithAuth(`/articles/${id}`, 'DELETE');
  }

  _sendReqWithAuth(url, method = 'GET', options = {}) {
    return this.sendReq(url, method, {
      ...options,
      headers: {
        Authorization: this._authToken,
        ...options.headers,
      },
    });
  }

  _setAuthToken(token) {
    this._authToken = `Bearer ${token}`;
  }
}

export default new MainApi(MAIN_URL);
