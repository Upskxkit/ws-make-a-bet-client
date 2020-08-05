import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserRPC, Channels } from "../../constants";
import { useSocket } from "../../hooks/useSocket";
import { useUser } from "../../hooks/useUser";
import { ReactComponent as InnovecsIcon } from "../../icons/innovecs.svg";
import { Flex } from "../../styles/styled";
import { NavBarWrapper } from "./styled";

export function NavBar() {
  const { user, clear } = useUser();
  const socket = useSocket();

  useEffect(() => {
    socket.on(Channels.User, ({ method }) => {
      if (method === UserRPC.Logout) {
        clear();
      }
    });

    //TODO unsubscribe
  });

  function logout() {
    socket.emit(Channels.User, { method: UserRPC.Logout });
    clear();
  }

  return (
    <NavBarWrapper>
      <RouterLink
        to={"/"}
        style={{
          backgroundColor: "red",
          alignSelf: "center",
          margin: "8px 16px",
          padding: "4px"
        }}
      >
        <InnovecsIcon/>
      </RouterLink>
      <div>
        {user ? (
          <Flex
            alignCenter
            direction="row"
            style={{ margin: "8px 16px", padding: "4px" }}
          >
            <Typography
              variant="h3"
              style={{ marginRight: "5px" }}
              color="secondary"
            >
              {user.username}
            </Typography>
            <Button variant="outlined" color="secondary" onClick={logout}>
              logout
            </Button>
          </Flex>
        ) : (
          <ButtonGroup
            color="primary"
            aria-label="text primary button group"
            style={{
              margin: "8px 16px",
              padding: "4px"
            }}
          >
            <Button>
              <RouterLink className="link-button" to={"/signin"}>
                Sign in
              </RouterLink>
            </Button>
            <Button>
              <RouterLink className="link-button" to={"/signup"}>
                Sign up
              </RouterLink>
            </Button>
          </ButtonGroup>
        )}
      </div>
    </NavBarWrapper>
  );
}
