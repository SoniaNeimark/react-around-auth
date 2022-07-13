export const BASE_URL = "https://register.nomoreparties.co";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  })
    .then((response) => {
      try {
        if (response.status === 201) {
          console.log(response)
          return response.json();
        }
      } catch (e) {
        return e;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// auth.js

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier: identifier, password: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.jwt) {
        console.log(data.jwt)
        localStorage.setItem("jwt", data.jwt);
        return data;
      } else {
        console.log(data);
      }
    })
    .catch((err) => console.log(err));
};
