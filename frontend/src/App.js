import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home.jsx";
import Chat from "./components/Chat.jsx";
import { useSelector } from "react-redux";

function App() {
  const authenticated = useSelector((state) => state.auth.authenticated);

  const AuthorizedRoutes = () => {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/chat" component={Chat} />
        <Redirect to="/" />
      </Switch>
    );
  };

  const UnAuthorizedRoutes = () => {
    return (
      <>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Redirect to="/signin" />
        </Switch>
      </>
    );
  };

  return (
    <div className="App">
      {authenticated ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />}
    </div>
  );
}

export default App;
