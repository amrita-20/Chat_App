import loginView from "./loginView";
import { chatView, chatContainer } from "./chatView";

export function render(state, rootEl) {
  let view = loginView(state);
  if (state.isLoggedIn) {
    view = chatView(state);
  }
  const html = `<main class="main">
    ${getSpinner(state)}
    ${generateErrorView(state)}
    ${view}
    </main>`;
  rootEl.innerHTML = html;
}

export function updateChatWindow(state, rootEl) {
  const chatContainerElement = rootEl.querySelector(".chat-container");
  if (chatContainerElement) {
    chatContainerElement.innerHTML = chatContainer(state);
  }
}

function generateErrorView(state) {
    if(state.error) {
        return `
        <div class="status">${state.error}</div>
    `;
    }
    return ``;
}

function getSpinner(state) {
  if (state.isLoading) {
    return `<div class="spinner-container">
            <div class="spinner"></div>
        </div>`;
  }
  return ``;
}
