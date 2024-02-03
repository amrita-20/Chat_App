const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const sessions = require("./sessions");
const users = require("./users");
const chat = require("./chat");

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

app.get("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  if (!sessions.isValidSession(sid)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const username = sessions.getSessionUser(sid);
  res.json({ username });
});

app.post("/api/v1/session", (req, res) => {
  const { username } = req.body;
  const errorCode = users.validateUsername(username);
  if (errorCode) {
    res.status(400).json({ error: errorCode });
    return;
  }
  const sid = sessions.addSession(username);
  res.cookie("sid", sid);
  res.json({ username });
});

app.delete("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  if (sid) {
    res.clearCookie("sid");
  }
  sessions.deleteSession(sid);
  res.json({ message: "user is logged out" });
});

app.get("/api/v1/user/details", (req, res) => {
  const sid = req.cookies.sid;

  if (!sessions.isValidSession(sid)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const username = sessions.getSessionUser(sid);
  const existingUserData = users.getUserDetails(username);

  if (!existingUserData) {
    users.addUserDetails(username, chat.getChats(), sessions.getUserList());
  }

  res.json({
    chats: chat.getChats(),
    users: sessions.getUserList(username),
  });
});

app.post("/api/v1/user/chats", (req, res) => {
  const sid = req.cookies.sid;

  if (!sessions.isValidSession(sid)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const username = sessions.getSessionUser(sid);
  const { message, timeStamp } = req.body;
  chat.addMessage(username, message, timeStamp);
  res.json(chat.getChats());
});

app.listen(PORT);
