import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
//import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
