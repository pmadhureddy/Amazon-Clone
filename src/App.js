import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./features/amazon/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Orders from "./Orders";
import Login from "./Login";
import Payment from "./Payment";
import "./App.css";

const promise = loadStripe(
  "pk_test_51HgRquEkiUIB2W4ZCEGmRhXcVhQKi4E52MeqkOoUlohE5GwMG09c7LAErgqEs2qgnVVbb96EJbzarnvFmjev4iRD00gXyPzrIv"
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser({ user: authUser }));
      } else {
        dispatch(setUser({ user: null }));
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
