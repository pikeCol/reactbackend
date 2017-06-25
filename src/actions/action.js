// action类型
export const LOGOUT = 'LOGOUT';

export function logout(text) {
  return { type: LOGOUT, text }
}
