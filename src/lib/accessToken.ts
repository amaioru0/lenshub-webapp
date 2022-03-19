let accessToken = "";

export const setAccessToken = (s: string) => {
  // accessToken = s;
  localStorage.setItem('jid', s)
};

export const getAccessToken = () => {
  // return accessToken;
  if (typeof window !== 'undefined') return localStorage.getItem('jid')
};

export const logOut = () => {
  localStorage.removeItem('jid');
}