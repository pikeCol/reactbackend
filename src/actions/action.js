// action类型
export const LOGOUT = 'logout';
export const LOGIN = 'login';

export function logout(text) {
  return { type: LOGOUT, text }
}

export function login(text) {
  return { type: LOGIN, text }
}
