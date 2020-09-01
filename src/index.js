import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk'

import './styles/main.css'
import './styles/global.css'

import App from './components/App';
import reducers from './reducers';

const store = configureStore({
  reducer: reducers,
  middleware: [thunkMiddleware, ...getDefaultMiddleware()],
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector("#root"));
