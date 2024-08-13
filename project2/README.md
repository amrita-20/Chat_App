# Project 2 - JS Chat

A Single Page Application (SPA) developed using Javascript, Node.js, HTML and CSS that leverages RESTful services for a straightforward and efficient chat experience. Users can seamlessly participate in a shared chat forum where all messages, and list of users, are visible to logged-in users. The application provides a user-friendly interface for an intuitive and collaborative chat environment.


### Learning Goals of this assignment:

- Write RESTful services using express, following the 3 Basic Rules of Rest presented in class. (Reminder that these are my personal rules summarizing REST, you won't be able to Google them effectively)
- Call RESTful services in front end JS using fetch as demonstrated in class
- Practice maintaining persistent state on the server and using services to load and update client state
- Practice using browser based JS to maintain and update state, and use that state to render updates to the HTML
- Practice using RESTful services for authentication/authorization
- Write a basic polling feature to check the server for updates and update client state
  - Not using websockets or long polling, just a simple time-based loop

### Requirement Overview

- An express server that will serve static assets and RESTful services
- Load a static HTML page as the SPA from your express server
- The HTML will load a static JS file bundled and transpiled with webpack and babel
- The SPA will require a user to login to view/use the chat
  - The SPA will determine (using a service call) on load if the user is already logged in. Users that are already logged in are not required to login again.
- A logged in user will see a list of messages, a list of currently logged in users, and will be able to send messages
- Every message will identify which user sent it
- Every 5 seconds (roughly) the client side will check to see if there are new messages and/or if the list of currently logged in users has changed
- A user can logout and return to the login screen
  - This removes that session from the list of currently logged in users
  - A given user might be logged in more than once at the same time (using multiple browsers or different browser profiles here, more often on phone/desktop in reality)! The username only shows up once in the list of users regardless of how many simultaneous sessions they have, and that the username only leaves the list of currently logged in user when all sessions are logged out of


