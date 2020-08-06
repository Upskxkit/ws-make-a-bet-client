import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { SignupContainer } from "./styled";
import { useSocket } from "../../hooks/useSocket";
import { Channels, UserRPC } from "../../constants";
import { useUser } from "../../hooks/useUser";
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

function Login() {
  const history = useHistory();
  const { user, setUser } = useUser();
  const socket = useSocket();
  const classes = useStyles();
  const [values, setValues] = useState({ username: "" });

  useEffect(() => {
    if (user) {
      history.push(`/`);
    }
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = { username: values.username };
  };

  return (
    <SignupContainer>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography variant="h3" color="primary" className={classes.title}>
            Sign In
          </Typography>
          <TextField
            id="username"
            label="Username"
            className={classes.textField}
            value={values.username}
            onChange={handleChange("username")}
            margin="normal"
          />
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
    </SignupContainer>
  );
}

export { Login };

//(data) => {
//       const { method, args } = data;
//
//       if (method !== UserRPC.Login) {
//         return;
//       }
//
//       if ("error" in args) {
//         toast.error(args.error);
//       } else {
//         setUser(args);
//         history.push(`/`);
//       }
//     }
