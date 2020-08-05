export function useLocalStorage() {
  const set = (key, value) => {
    localStorage[key] = value;
    return localStorage[key];
  };

  const get = (key, silent = true) => {
    const value = localStorage[key];

    if (!silent && !value) throw new Error(`${key} not found in localStorage`);

    return value || null;
  };

  const setObject = (key, value) => {
    localStorage[key] = JSON.stringify(value);
    return localStorage[key];
  };

  const getObject = (key, silent = true) => {
    const value = get(key, silent);

    try {
      return JSON.parse(value);
    } catch (err) {
      if (!silent) throw new Error("Error in parsing value");
      return null;
    }
  };

  const clear = () => localStorage.clear();
  const remove = (key) => localStorage.removeItem(key);

  return { set, get, setObject, getObject, clear, remove };
}
