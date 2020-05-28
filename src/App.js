import React from 'react';
import logo from './logo.svg';
import './App.css';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import graphApp  from "./reducers/index";
import {Provider} from 'react-redux';
import Log from "./log";

function App() {
  var store =  createStore(graphApp, {graph:{}}, applyMiddleware(thunkMiddleware));
  return (
    <Provider store={store}>
    <Log />
    </Provider>
  );
}

export default App;

