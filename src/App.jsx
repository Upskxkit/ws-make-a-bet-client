import React from "react";
import { Wrapper } from "./Wrapper";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { SocketProvider } from "./hooks/useSocket";
import { UserProvider } from "./hooks/useUser";
import theme from "./styles/theme";

export class App extends React.Component {
  render() {
    return (
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <SocketProvider
            url={`${process.env.REACT_APP_API}`}
            opts={{ path: "/ws", transports: ["websocket"] }}
          >
            <UserProvider>
              <Wrapper />
            </UserProvider>
          </SocketProvider>
        </ThemeProvider>
      </StylesProvider>
    );
  }
}
