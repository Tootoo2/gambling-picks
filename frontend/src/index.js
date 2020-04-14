import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./App";
import reducers from "./reducers";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  blue,
  grey,
  lightBlue,
  orange,
  blueGrey,
} from "@material-ui/core/colors";

const store = createStore(
  reducers,
  { auth: { authenticated: localStorage.getItem("token") } },
  applyMiddleware(thunk)
);

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: lightBlue,
  },
});
const themeDark = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: lightBlue,
    type: "dark",
  },
});

console.log(themeDark);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={themeDark}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
