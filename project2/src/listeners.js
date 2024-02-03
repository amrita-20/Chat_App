import { render, updateChatWindow } from "./mainView";
import {
  setError,
  setSpinner,
  login,
  logout,
  setUserDetails,
  addChats,
  resetSpinner,
} from "./state";
import {
  fetchLogin,
  fetchLogout,
  sendMessage,
  fetchUserDetails,
} from "./service";
import { CLIENT, SERVER } from "./constants";

export function addListenerOnLogin(state, rootEl) {
  rootEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("login-button")) {
      const username = rootEl.querySelector("#username").value;
      setSpinner();
      rootEl.classList.add("blur");
      render(state, rootEl);
      fetchLogin({ username })
        .then((session) => {
          login(session.username);
          setSpinner();
          render(state, rootEl);
          return fetchUserDetails();
        })
        .catch((err) => {
            resetSpinner();
            rootEl.classList.remove("blur");
            render(state, rootEl);
            if (err?.error === SERVER.AUTH_MISSING) {
              return Promise.reject({ error: CLIENT.NO_SESSION });
            }
            return Promise.reject(err);
        })
        .then((userDetails) => {
          setUserDetails(userDetails);
          rootEl.classList.remove("blur");
          render(state, rootEl);
        })
        .catch((err) => {
          resetSpinner();
          rootEl.classList.remove("blur");
          if (err?.error == CLIENT.NO_SESSION) {
            logout();
            render(state, rootEl);
            return;
          }
          setError(err?.error || "ERROR");
          render(state, rootEl);
        });
    }
  });
}

export function addListenerOnLogout(state, rootEl) {
  rootEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("logout-button")) {
      setSpinner();
      rootEl.classList.add("blur");
      render(state, rootEl);
      fetchLogout()
        .then(() => {
          logout();
          rootEl.classList.remove("blur");
          render(state, rootEl);
        })
        .catch((err) => {
          setError(err?.error || "ERROR");
          rootEl.classList.remove("blur");
          render(state, rootEl);
        });
    }
  });
}

function getCurrentTimestamp() {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return now.toLocaleString(undefined, options);
}

export function addListenerOnSend(state, rootEl) {
  rootEl.addEventListener("submit", (event) => {
    //event.preventDefault();
    if (event.target.classList.contains("outgoing-form")) {
      const message = rootEl.querySelector(".to-send").value;
      const timeStamp = getCurrentTimestamp();
      render(state, rootEl);
      sendMessage({ message, timeStamp })
        .then((chats) => {
          addChats(chats);
          rootEl.querySelector(".to-send").focus();
          updateChatWindow(state, rootEl);
        })
        .catch((err) => {
          if (err?.error === SERVER.AUTH_MISSING) {
            logout();
          } else {
            setError(err?.error || "ERROR");
          }
          render(state, rootEl);
        });
    }
  });
}
