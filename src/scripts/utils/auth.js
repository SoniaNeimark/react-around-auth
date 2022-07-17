export const BASE_URL = "https://register.nomoreparties.co";

export const register = (password, email, errorHandler) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password: password, email: email })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("");
    })
    .then(res => {
      return res;
    })
    .catch(err => err && errorHandler());
};

export const authorize = (email, password, errorHandler) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email, password: password })
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Oops");
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
      return;
    })
    .catch(error => {
      if (error) {
        errorHandler();
      }
    });
};

export const getContent = token => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));
};
