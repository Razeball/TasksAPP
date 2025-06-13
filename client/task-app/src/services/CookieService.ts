import Cookies from 'js-cookie';

const TOKEN_KEY = 'authToken';

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const setToken = (token: string): void => {

  Cookies.set(TOKEN_KEY, token, { expires: 7, path: '/' , secure:true});
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY, { path: '/' });
};