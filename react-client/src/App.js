import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Home from "./pages/Home";
import "./App.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import UserContext from "./context/userContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      setUserData({
        token,
        user: token ? jwt_decode(token) : null,
      });
    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
