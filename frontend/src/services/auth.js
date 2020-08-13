
export const isAuthenticated = () =>  {
  localStorage.getItem('access_token') !== null;
  localStorage.getItem('refresh_token') !== null;
}

export const logoutToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

