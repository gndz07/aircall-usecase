import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Login from "../components/pages/Login";
import Dashboard from "../components/pages/Dashboard";
//import Header from '../components/Header.js';
//import Footer from '../components/Footer.js';
import "../App.css";
import { RootState } from "../reducers";
import * as storage from "../libs/storage";
import Actions from "../actions";
import * as jwt from "../libs/jwt";

export default function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const accessToken = await storage.get(storage.Key.Token);
      const refreshToken = await storage.get(storage.Key.RefreshToken);
      const username = await storage.get(storage.Key.Username);
      console.log(jwt.isExpired(accessToken));
      console.log(jwt.isExpired(refreshToken));
      if (accessToken) {
        if (!jwt.isExpired(accessToken)) {
          dispatch(
            Actions.Auth.Token({
              accessToken: accessToken.replace(/\"/g, ""),
              refreshToken: refreshToken.replace(/\"/g, ""),
              username: username.replace(/\"/g, ""),
            })
          );
        } else {
          if (!jwt.isExpired(refreshToken)) {
            dispatch(Actions.Auth.RefreshToken.request());
          } else {
            localStorage.clear();
          }
        }
      }
    })();
  }, []);

  const token = useSelector(
    (state: RootState) => state.auth.user?.access_token
  );

  return (
    <Router>
      <div id="main-container">
        <Switch>
          <Route exact path="/">
            {token ? <Dashboard /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">{token ? <Redirect to="/" /> : <Login />}</Route>
        </Switch>
      </div>
    </Router>
  );
}
