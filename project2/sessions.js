const uuid = require("uuid").v4;

const sessions = {};
const activeUsers = {};

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

const addSession = (username) => {
  sid = uuid();
  sessions[sid] = { username };
  if (activeUsers[username]) {
    activeUsers[username].push(sid);
  } else {
    activeUsers[username] = [sid];
  }
  return sid;
};

const deleteSession = (sid) => {
  const username = getSessionUser(sid);
  if (username) {
    delete sessions[sid];
    activeUsers[username] = activeUsers[username].filter(
      (userSid) => userSid != sid
    );
    if (activeUsers[username].length == 0) {
      delete activeUsers[username];
    }
  }
};

const isValidSession = (sid) => {
  const username = sid ? getSessionUser(sid) : "";
  if (!sid || !username) {
    return false;
  }
  return true;
};

const getUserList = (username) => {
  return Object.keys(activeUsers).filter((user) => user !== username);
};

module.exports = {
  getSessionUser,
  addSession,
  deleteSession,
  getUserList,
  isValidSession,
};
