class Api {
  constructor() {
    this._baseUrl = "https://news-explorer-api-avm7.vercel.app";
    this._headers = {
      "Content-Type": "application/json",
    };
  }

  _setHeaders(token) {
    const auth = `Bearer ${token}`;
    this._headers.authorization = auth;
    return this._headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserData(token) {
    this._setHeaders(token)
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards(token) {
    this._setHeaders(token)
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editProfile({ name, about }, token) {
    this._setHeaders(token)
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  editAvatar(url, token) {
    this._setHeaders(token)
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponse);
  }

  addCard(cardObj, token) {
    this._setHeaders(token)
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardObj),
    }).then(this._checkResponse);
  }

  deleteCard(cardId, token) {
    this._setHeaders(token)
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addLike(cardId, token) {
    this._setHeaders(token)
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLike(cardId, token) {
    this._setHeaders(token)
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api();
export default api;
