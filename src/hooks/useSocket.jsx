import React, { useContext, createContext, useRef } from "react";
import io from "socket.io-client";
import { useLocalStorage } from "./useLocalStorage";

const SocketContext = createContext(null);

export function useSocket() {
  const socket = useContext(SocketContext);

  return socket;
}

export const SocketProvider = ({ url, opts, children }) => {
  let defaultOpts = opts;
  const socketRef = useRef();

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

//const { getObject } = useLocalStorage();
//
//   const user = getObject("user");
//
//   if (user) {
//     defaultOpts = {
//       ...defaultOpts,
//       query: { ...defaultOpts.query, token: user.id }, //User_id
//     };
//   }
//
//   if (!socketRef.current) {
//     socketRef.current = io(url, defaultOpts);
//   }
