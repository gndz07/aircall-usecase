import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Login from "components/pages/Login";
import Dashboard from "components/pages/Dashboard";
import CallData from "components/pages/CallData";
import Header from "components/Header";
import NotFound from "components/pages/NotFound"
//import Footer from '../components/Footer';
import "../App.css";
import { RootState } from "reducers";
import * as storage from "libs/storage";
import Actions from "actions";
import * as jwt from "libs/jwt";
import Pusher from "pusher-js";

export default function AppRouter() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem(storage.Key.Token);

  useEffect(() => {
    (async () => {
      const refreshToken = await storage.get(storage.Key.RefreshToken);
      const username = await storage.get(storage.Key.Username);
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

  useEffect(() => {
    if (accessToken) {
      const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
        cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
        authEndpoint: process.env.REACT_APP_PUSHER_AUTH_ENDPOINT
      });
      const channel = pusher.subscribe("private-aircall");
      channel.bind("update-call", data => {
        dispatch(Actions.Calls.UpdateCallData(data))
      })
    }
  }, [])

  const token = useSelector(
    (state: RootState) => state.auth.user?.access_token
  );

  return (
    <Router>
      <div id="main-container">
        {token ? <Header /> : false}
        <Switch>
          <Route path="/login">{token ? <Redirect to="/" /> : <Login />}</Route>
            <Route exact path="/">
              {token ? <Dashboard /> : <Redirect to="/login" />}
            </Route>
            <Route path='/call/:id' component={CallData} />
            <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
