import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import App from "./App.jsx";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import Reducers from "./reducers/index.js";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  thunk
)(createStore);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider
    store={createStoreWithMiddleware(
      Reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
