export function fetchSession() {
  return makeServiceCallWithoutHeaders("/api/v1/session/", "GET");
}

export function fetchLogin(username) {
  return makeServiceCallWithHeaders("/api/v1/session/", "POST", username);
}

export function fetchLogout() {
  return makeServiceCallWithoutHeaders("/api/v1/session/", "DELETE");
}

export function fetchUserDetails() {
  return makeServiceCallWithoutHeaders("/api/v1/user/details/", "GET");
}

export function sendMessage(message) {
  return makeServiceCallWithHeaders("/api/v1/user/chats/", "POST", message);
}

function makeServiceCallWithHeaders(url, methodType, request) {
  return fetch(url, {
    method: methodType,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .catch(() => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => Promise.reject(error));
      }
      return response.json();
    });
}

function makeServiceCallWithoutHeaders(url, methodType) {
  return fetch(url, {
    method: methodType,
  })
    .catch(() => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => Promise.reject(error));
      }
      return response.json();
    });
}
