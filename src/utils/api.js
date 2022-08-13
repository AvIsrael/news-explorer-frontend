class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  sendReq(url, method = 'GET', options = {}) {
    return fetch(this._baseUrl + url, {
      ...options,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  }
}

export default Api;
