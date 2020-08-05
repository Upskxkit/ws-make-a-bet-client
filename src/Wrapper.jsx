import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppStyled } from "./styles/styled";
import { NavBar } from "./components/NavBar";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Product } from "./pages/Product";

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

export function Wrapper() {
  return (
    <AppStyled>
      <Router>
        <Route component={ScrollToTop} />
        <NavBar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/product" component={Product} />
          <Route path="/signup" component={Register} />
          <Route path="/signin" component={Login} />
          <Route path="*" component={() => <Redirect to="/404" />} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </Router>
    </AppStyled>
  );
}
