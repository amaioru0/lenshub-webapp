let accessToken = "";

export const setAccessToken = (s: string) => {
  // accessToken = s;
  localStorage.setItem('jid', s)
};

export const getAccessToken = () => {
  // return accessToken;
  if (typeof window !== 'undefined') return localStorage.getItem('jid')
};

export const setRefreshToken = (s: string) => {
  // accessToken = s;
  localStorage.setItem('refreshToken', s)
};

export const getRefreshToken = () => {
  // return accessToken;
  if (typeof window !== 'undefined') return localStorage.getItem('refreshToken')
};

export const logOut = () => {
  localStorage.removeItem('jid');
}