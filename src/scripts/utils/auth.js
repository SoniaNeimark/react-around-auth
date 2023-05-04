export const BASE_URL = "https://news-explorer-api-avm7.vercel.app";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  const error = new Error("authorizationError");
  return Promise.reject(error + ". Error status: " + res.status);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((res) => checkResponse(res))
    .then((data) => data);
};

export const authorize1 = (email, password) => {
  return (
    fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => checkResponse(res))
      .then((data) => {
        if (!data.token) {
          const error = new Error("unauthorized");
          throw error;
        }
        localStorage.setItem("token", data.token);
        return data;
      })
  );
};
export const authorize = (email, password) => {
return fetch(`${BASE_URL}/signin`, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: email, password: password }),
})
  .then((res) => checkResponse(res))
  .then((data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      return data;
    }
    return;
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => data);
};
