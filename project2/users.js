const users = {};

const usernamePattern = /^[a-zA-Z0-9]+$/;

const validateUsername = (username) => {
  if (!username) {
    return "required-username";
  }
  if (username.toLowerCase() === "dog") {
    return "auth-insufficient";
  }
  if (!username.match(usernamePattern)) {
    return "invalid-username";
  }
  return "";
};

const addUserDetails = (username, chats, users) => {
  if (!users[username]) {
    users[username] = { chats, users };
  }
};

const getUserDetails = (username) => {
  if (users.hasOwnProperty(username)) {
    return users[username];
  }
};

module.exports = {
  validateUsername,
  addUserDetails,
  getUserDetails,
};
