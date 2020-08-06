import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import React, { useEffect, useState, useCallback } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { Channels, UserRPC } from "../../constants";
import { useSocket } from "../../hooks/useSocket";
import { useUser } from "../../hooks/useUser";
import { SignupContainer } from "./styled";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    maxHeight: 240,
    textAlign: "center",
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export function Register() {
  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    open: false,
    error: "",
  });
  const { user } = useUser();
  const socket = useSocket();
  const socketListener = useCallback(
    (data) => {
      const { method, args } = data;

      if (method !== UserRPC.Register) {
        return;
      }

      if ("error" in args) {
        toast.error(args.error);
        setValues({ ...values, error: args.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    },
    [socket]
  );

  useEffect(() => {
    if (user) {
      history.push(`/`);
      return;
    }

    socket.on(Channels.User, socketListener);

    return () => {
      socket.off(Channels.User, socketListener);
    };
  }, []);

  const handleChange = (name) => (event) => {
    event.persist();
    setValues((prev) => {
      return { ...prev, [name]: event.target.value };
    });
  };

  const clickSubmit = () => {
    const user = { username: values.username };

    socket.emit(Channels.User, { method: UserRPC.Register, args: user });
  };
  return (
    <SignupContainer>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography variant="h3" color="primary" className={classes.title}>
            Sign Up
          </Typography>
          <TextField
            id="username"
            label="Username"
            className={classes.textField}
            value={values.username}
            onChange={handleChange("username")}
            margin="normal"
          />
          {values.error && (
            <Typography component="p" color="error">
              <ErrorOutlineIcon color="error" className={classes.error} />
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            component={RouterLink}
            to={"/signin"}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </SignupContainer>
  );
}
