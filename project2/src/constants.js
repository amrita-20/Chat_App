export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    INVALID_USERNAME: 'invalid-username',
}

export const CLIENT = {
    NETWORK_ERROR: 'network-error',
    NO_SESSION: 'no-session',
}

export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Username is required, please enter',
    [SERVER.INVALID_USERNAME]: 'Please enter a valid username, it should contain only letters or numbers',
    default: 'Something went wrong.  Please try again',
  };
  