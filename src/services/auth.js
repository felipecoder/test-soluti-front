export const TOKEN_KEY = "@soluti-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const USER_NAME = "@soluti-User";
export const getUserName = () => localStorage.getItem(USER_NAME);
export const username = name => {
  localStorage.setItem(USER_NAME, name);
};
