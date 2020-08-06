import React, { useContext, createContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const UserContext = createContext({
  user: null,
  setUser: () => {},
  clear: () => {},
});

export function UserProvider(props) {
  const { getObject, setObject, remove } = useLocalStorage();
  const [state, setState] = useState(getObject("user") || null);

  function setUser(user) {}

  function clear() {}

  return (
    <UserContext.Provider value={{ user: state, setUser, clear }} {...props} />
  );
}

export function useUser() {
  const userCtx = useContext(UserContext);

  return {
    user: userCtx.user,
    setUser: userCtx.setUser,
    clear: userCtx.clear,
  };
}
