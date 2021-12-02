export const getTokenLocalStorage = (key: string) => localStorage.getItem(key);

export const setTokenLocalStorage = (key: string, value) =>
  localStorage.setItem(key, JSON.stringify(value));
