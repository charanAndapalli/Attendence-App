import jwtDecode from 'jwt-decode';

export const saveToken = (t) => localStorage.setItem('token', t);
export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.removeItem('token');
export const getUserFromToken = () => {
  const t = getToken();
  if (!t) return null;
  try { return jwtDecode(t); } catch { return null; }
};
