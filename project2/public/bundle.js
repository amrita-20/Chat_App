/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/chatView.js":
/*!*************************!*\
  !*** ./src/chatView.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chatContainer: () => (/* binding */ chatContainer),
/* harmony export */   chatView: () => (/* binding */ chatView),
/* harmony export */   getInputForm: () => (/* binding */ getInputForm)
/* harmony export */ });
function chatView(state) {
  return "\n    <div class=\"wrapper\">\n    <div class=\"sidebar\">\n        <div class=\"capitalize\">\n          <img class=\"avatar\" alt=\"avatar\" src=\"/assets/avatar.jpg\" />\n          ".concat(state.username, "\n        </div>\n        <h1 class=\"title\">ChatHub</h1>\n        <button type=\"button\" class=\"button logout-button\">Logout</button>\n    </div>\n    <div class=\"chat-container\">\n      ").concat(chatContainer(state), "\n      </div>\n      <div class=\"outgoing\">\n        ").concat(getInputForm(), "\n      </div>\n    </div>\n      ");
}
function chatContainer(state) {
  return "\n  <div class=\"users-container\">\n  ".concat(getUserList(state), "\n  </div>\n  <div class=\"chat-window\">\n  ").concat(getMessages(state), "\n  </div>");
}
function getUserList(state) {
  if (state.users.length > 0) {
    return "<ul class=\"users\">" + state.users.map(function (user) {
      return "<li class=\"user-list capitalize\">\n        <img class=\"avatar\" alt=\"avatar\" src=\"/assets/avatar.jpg\" />\n        ".concat(user, "\n      </li>");
    }).join("") + "</ul>";
  }
  return "No one is online";
}
function getMessages(state) {
  if (Object.keys(state.chats).length > 0) {
    return "<ol class=\"messages\">" + state.chats.map(function (chat) {
      return "<li class=\"message-list\">\n      <div class=\"message-sender\">\n        <div class=\"sender-info\">\n          <img class=\"avatar\" alt=\"avatar\" src=\"/assets/avatar.jpg\" />\n          <span class=\"capitalize\">".concat(chat.username, "</span>\n          <span class=\"timestamp\"> ").concat(chat.timeStamp, " </span>\n        </div>\n        <p class=\"message-text\">").concat(chat.message, "</p>\n      </div>\n    </li>");
    }).join("") + "</ol>";
  }
  return "Chat window is empty start a converstation";
}
function getInputForm() {
  return "\n  <form class=\"outgoing-form\">\n    <input\n      class=\"to-send\"\n      value=\"\"\n      name=\"message\"\n      placeholder=\"Enter message to send\"\n    />\n    <button class=\"send\" type=\"submit\">Send</button>\n  </form>";
}

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  INVALID_USERNAME: 'invalid-username'
};
var CLIENT = {
  NETWORK_ERROR: 'network-error',
  NO_SESSION: 'no-session'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), SERVER.AUTH_INSUFFICIENT, 'Your username/password combination does not match any records, please try again.'), SERVER.REQUIRED_USERNAME, 'Username is required, please enter'), SERVER.INVALID_USERNAME, 'Please enter a valid username, it should contain only letters or numbers'), "default", 'Something went wrong.  Please try again');

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addListenerOnLogin: () => (/* binding */ addListenerOnLogin),
/* harmony export */   addListenerOnLogout: () => (/* binding */ addListenerOnLogout),
/* harmony export */   addListenerOnSend: () => (/* binding */ addListenerOnSend)
/* harmony export */ });
/* harmony import */ var _mainView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainView */ "./src/mainView.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service */ "./src/service.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");




function addListenerOnLogin(state, rootEl) {
  rootEl.addEventListener("click", function (event) {
    if (event.target.classList.contains("login-button")) {
      var username = rootEl.querySelector("#username").value;
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setSpinner)();
      rootEl.classList.add("blur");
      (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.render)(state, rootEl);
      (0,_service__WEBPACK_IMPORTED_MODULE_2__.fetchLogin)({
        username: username
      }).then(function (session) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username);
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setSpinner)();
        (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.render)(state, rootEl);
        return (0,_service__WEBPACK_IMPORTED_MODULE_2__.fetchUserDetails)();
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.resetSpinner)();
        rootEl.classList.remove("blur");
        (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.render)(state, rootEl);
        if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_3__.SERVER.AUTH_MISSING) {
          return Promise.reject({
            error: _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION
          });
        }
        return Promise.reject(err);
      }).then(function (userDetails) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUserDetails)(userDetails);
        rootEl.classList.remove("blur");
        (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.render)(state, rootEl);
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.resetSpinner)();
        rootEl.classList.remove("blur");
        if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION) {
          (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
          (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.render)(state, rootEl);
          return;
        }
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
        (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.render)(state, rootEl);
      });
    }
  });
}
function addListenerOnLogout(state, rootEl) {
  rootEl.addEventListener("click", function (event) {
    if (event.target.classList.contains("logout-button")) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setSpinner)();
      rootEl.classList.add("blur");
      (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.render)(state, rootEl);
      (0,_service__WEBPACK_IMPORTED_MODULE_2__.fetchLogout)().then(function () {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
        rootEl.classList.remove("blur");
        (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.render)(state, rootEl);
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
        rootEl.classList.remove("blur");
        (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.render)(state, rootEl);
      });
    }
  });
}
function getCurrentTimestamp() {
  var now = new Date();
  var options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  return now.toLocaleString(undefined, options);
}
function addListenerOnSend(state, rootEl) {
  rootEl.addEventListener("submit", function (event) {
    //event.preventDefault();
    if (event.target.classList.contains("outgoing-form")) {
      var message = rootEl.querySelector(".to-send").value;
      var timeStamp = getCurrentTimestamp();
      (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.render)(state, rootEl);
      (0,_service__WEBPACK_IMPORTED_MODULE_2__.sendMessage)({
        message: message,
        timeStamp: timeStamp
      }).then(function (chats) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.addChats)(chats);
        rootEl.querySelector(".to-send").focus();
        (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.updateChatWindow)(state, rootEl);
      })["catch"](function (err) {
        if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_3__.SERVER.AUTH_MISSING) {
          (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
        } else {
          (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
        }
        (0,_mainView__WEBPACK_IMPORTED_MODULE_0__.render)(state, rootEl);
      });
    }
  });
}

/***/ }),

/***/ "./src/loginView.js":
/*!**************************!*\
  !*** ./src/loginView.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function loginView(state) {
  return " <div class=\"login\">\n    <div class=\"form-container\">\n        <form class=\"login-form\">\n            <div class=\"form-group\">\n                <label class=\"label\" for=\"username\">Username</label>\n                <input class=\"input\" type=\"text\" name=\"username\" id=\"username\">\n            </div>\n            <button class=\"button login-button\" type=\"button\">Submit</button>\n        </form>\n    </div>\n</div>";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loginView);

/***/ }),

/***/ "./src/mainView.js":
/*!*************************!*\
  !*** ./src/mainView.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   updateChatWindow: () => (/* binding */ updateChatWindow)
/* harmony export */ });
/* harmony import */ var _loginView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loginView */ "./src/loginView.js");
/* harmony import */ var _chatView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chatView */ "./src/chatView.js");


function render(state, rootEl) {
  var view = (0,_loginView__WEBPACK_IMPORTED_MODULE_0__["default"])(state);
  if (state.isLoggedIn) {
    view = (0,_chatView__WEBPACK_IMPORTED_MODULE_1__.chatView)(state);
  }
  var html = "<main class=\"main\">\n    ".concat(getSpinner(state), "\n    ").concat(generateErrorView(state), "\n    ").concat(view, "\n    </main>");
  rootEl.innerHTML = html;
}
function updateChatWindow(state, rootEl) {
  var chatContainerElement = rootEl.querySelector(".chat-container");
  if (chatContainerElement) {
    chatContainerElement.innerHTML = (0,_chatView__WEBPACK_IMPORTED_MODULE_1__.chatContainer)(state);
  }
}
function generateErrorView(state) {
  if (state.error) {
    return "\n        <div class=\"status\">".concat(state.error, "</div>\n    ");
  }
  return "";
}
function getSpinner(state) {
  if (state.isLoading) {
    return "<div class=\"spinner-container\">\n            <div class=\"spinner\"></div>\n        </div>";
  }
  return "";
}

/***/ }),

/***/ "./src/service.js":
/*!************************!*\
  !*** ./src/service.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUserDetails: () => (/* binding */ fetchUserDetails),
/* harmony export */   sendMessage: () => (/* binding */ sendMessage)
/* harmony export */ });
function fetchSession() {
  return makeServiceCallWithoutHeaders("/api/v1/session/", "GET");
}
function fetchLogin(username) {
  return makeServiceCallWithHeaders("/api/v1/session/", "POST", username);
}
function fetchLogout() {
  return makeServiceCallWithoutHeaders("/api/v1/session/", "DELETE");
}
function fetchUserDetails() {
  return makeServiceCallWithoutHeaders("/api/v1/user/details/", "GET");
}
function sendMessage(message) {
  return makeServiceCallWithHeaders("/api/v1/user/chats/", "POST", message);
}
function makeServiceCallWithHeaders(url, methodType, request) {
  return fetch(url, {
    method: methodType,
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(request)
  })["catch"](function () {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (error) {
        return Promise.reject(error);
      });
    }
    return response.json();
  });
}
function makeServiceCallWithoutHeaders(url, methodType) {
  return fetch(url, {
    method: methodType
  })["catch"](function () {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (error) {
        return Promise.reject(error);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addChats: () => (/* binding */ addChats),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   resetSpinner: () => (/* binding */ resetSpinner),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setSpinner: () => (/* binding */ setSpinner),
/* harmony export */   setUserDetails: () => (/* binding */ setUserDetails)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  isLoggedIn: false,
  isLoading: true,
  username: "",
  error: "",
  chats: {},
  users: []
};
function setSpinner() {
  state.isLoading = true;
  state.error = "";
}
function resetSpinner() {
  state.isLoading = false;
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoading = false;
  state.username = username;
  state.error = "";
}
function logout() {
  state.isLoggedIn = false;
  state.isLoading = false;
  state.username = "";
  state.error = "";
}
function setError(error) {
  if (!error) {
    state.error = "";
    return;
  }
  state.isLoading = false;
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
function setUserDetails(userDetails) {
  state.chats = (userDetails === null || userDetails === void 0 ? void 0 : userDetails.chats) || {};
  state.isLoading = false;
  state.error = "";
  state.users = (userDetails === null || userDetails === void 0 ? void 0 : userDetails.users) || [];
}
function addChats(chats) {
  state.chats = chats || {};
  state.isLoading = false;
  state.error = "";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ "./src/service.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _mainView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mainView */ "./src/mainView.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./src/constants.js");





var rootEl = document.querySelector("#app");
var init = function init() {
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.setSpinner)();
  rootEl.classList.add("blur");
  (0,_mainView__WEBPACK_IMPORTED_MODULE_2__.render)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
  (0,_service__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username);
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setSpinner)();
    (0,_mainView__WEBPACK_IMPORTED_MODULE_2__.render)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
    return (0,_service__WEBPACK_IMPORTED_MODULE_0__.fetchUserDetails)();
  })["catch"](function (err) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.resetSpinner)();
    rootEl.classList.remove("blur");
    (0,_mainView__WEBPACK_IMPORTED_MODULE_2__.render)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_4__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_4__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  }).then(function (userDetails) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUserDetails)(userDetails);
    rootEl.classList.remove("blur");
    (0,_mainView__WEBPACK_IMPORTED_MODULE_2__.render)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
  })["catch"](function (err) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.resetSpinner)();
    rootEl.classList.remove("blur");
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_4__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_mainView__WEBPACK_IMPORTED_MODULE_2__.render)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
    (0,_mainView__WEBPACK_IMPORTED_MODULE_2__.render)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
  });
};

//Polling
setInterval(function () {
  if (_state__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn) {
    (0,_service__WEBPACK_IMPORTED_MODULE_0__.fetchUserDetails)().then(function (userDetails) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUserDetails)(userDetails);
      (0,_mainView__WEBPACK_IMPORTED_MODULE_2__.updateChatWindow)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
    })["catch"](function (err) {
      if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_4__.SERVER.AUTH_MISSING) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      } else {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      }
      (0,_mainView__WEBPACK_IMPORTED_MODULE_2__.render)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
    });
  }
}, 5000);
(0,_mainView__WEBPACK_IMPORTED_MODULE_2__.render)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.addListenerOnLogin)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.addListenerOnLogout)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.addListenerOnSend)(_state__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
init();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map