import { MESSAGES } from "./constants";

const state = {
  isLoggedIn: false,
  isLoading: true,
  username: "",
  error: "",
  chats: {},
  users: [],
};

export function setSpinner() {
  state.isLoading = true;
  state.error = "";
}

export function resetSpinner() {
  state.isLoading = false;
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoading = false;
  state.username = username;
  state.error = "";
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoading = false;
  state.username = "";
  state.error = "";
}

export function setError(error) {
  if (!error) {
    state.error = "";
    return;
  }
  state.isLoading = false;
  state.error = MESSAGES[error] || MESSAGES.default;
}

export function setUserDetails(userDetails) {
  state.chats = userDetails?.chats || {};
  state.isLoading = false;
  state.error = "";
  state.users = userDetails?.users || [];
}

export function addChats(chats) {
  state.chats = chats || {};
  state.isLoading = false;
  state.error = "";
}

export default state;
