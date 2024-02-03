const chats = [];

const addMessage = (username, message, timeStamp) => {
  chats.push({ username, message, timeStamp });
};

const getChats = () => {
  return chats;
};

module.exports = {
  addMessage,
  getChats,
};
