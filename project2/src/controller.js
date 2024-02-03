import { fetchSession, fetchUserDetails } from "./service";
import state, {
  login,
  logout,
  resetSpinner,
  setUserDetails,
  setError,
  setSpinner,
} from "./state";
import { render, updateChatWindow } from "./mainView";
import {
  addListenerOnLogin,
  addListenerOnLogout,
  addListenerOnSend,
} from "./listeners";
import { CLIENT, SERVER } from "./constants";

const rootEl = document.querySelector("#app");

const init = () => {
  setSpinner();
  rootEl.classList.add("blur");
  render(state, rootEl);
  fetchSession()
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
};

//Polling
setInterval(() => {
  if (state.isLoggedIn) {
    fetchUserDetails()
      .then((userDetails) => {
        setUserDetails(userDetails);
        updateChatWindow(state, rootEl);
      })
      .catch((err) => {
        if( err?.error === SERVER.AUTH_MISSING ) {
            logout();
        }else{
            setError(err?.error || 'ERROR');
        }
        render(state, rootEl);
      });
  }
}, 5000);

render(state, rootEl);
addListenerOnLogin(state, rootEl);
addListenerOnLogout(state, rootEl);
addListenerOnSend(state, rootEl);
init();
