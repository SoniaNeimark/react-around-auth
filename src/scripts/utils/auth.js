export const BASE_URL = "https://register.nomoreparties.co";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((response) => {
      if (!response) {
        throw new Error()
      }
      return response.json();

      }
    )
    .then((res) => {
      if (!res.data) {
        throw new Error(res)
      }

      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

// auth.js

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((response) => {
      if (response.status >=400) {
        throw new Error(response.json)
      }
      return response.json()
    })
    .then((data) => {
      if (data.token) {
        console.log(data)
        localStorage.setItem("token", data.token);
        return data;
      }
    })
    .catch((err) => err);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err)
};