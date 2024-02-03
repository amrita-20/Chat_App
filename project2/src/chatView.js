export function chatView(state) {
  return `
    <div class="wrapper">
    <div class="sidebar">
        <div class="capitalize">
          <img class="avatar" alt="avatar" src="/assets/avatar.jpg" />
          ${state.username}
        </div>
        <h1 class="title">ChatHub</h1>
        <button type="button" class="button logout-button">Logout</button>
    </div>
    <div class="chat-container">
      ${chatContainer(state)}
      </div>
      <div class="outgoing">
        ${getInputForm()}
      </div>
    </div>
      `;
}

export function chatContainer(state) {
  return `
  <div class="users-container">
  ${getUserList(state)}
  </div>
  <div class="chat-window">
  ${getMessages(state)}
  </div>`;
}

function getUserList(state) {
  if (state.users.length > 0) {
    return (
      `<ul class="users">` +
      state.users
        .map((user) => {
          return `<li class="user-list capitalize">
        <img class="avatar" alt="avatar" src="/assets/avatar.jpg" />
        ${user}
      </li>`;
        })
        .join("") +
      `</ul>`
    );
  }
  return `No one is online`;
}

function getMessages(state) {
  if (Object.keys(state.chats).length > 0) {
    return (
      `<ol class="messages">` +
      state.chats
        .map((chat) => {
          return `<li class="message-list">
      <div class="message-sender">
        <div class="sender-info">
          <img class="avatar" alt="avatar" src="/assets/avatar.jpg" />
          <span class="capitalize">${chat.username}</span>
          <span class="timestamp"> ${chat.timeStamp} </span>
        </div>
        <p class="message-text">${chat.message}</p>
      </div>
    </li>`;
        })
        .join("") +
      `</ol>`
    );
  }
  return `Chat window is empty start a converstation`;
}

export function getInputForm() {
  return `
  <form class="outgoing-form">
    <input
      class="to-send"
      value=""
      name="message"
      placeholder="Enter message to send"
    />
    <button class="send" type="submit">Send</button>
  </form>`;
}
