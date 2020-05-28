import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { reducers } from "./store";
import { createStore, applyMiddleware, compose } from "redux";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
// import { watchAgeUp } from "./sagas/saga";
import "./index.css";
import "./styles/styles.scss";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducers, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer autoClose={2000} />
  </Provider>,
  document.getElementById("root")
);
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
