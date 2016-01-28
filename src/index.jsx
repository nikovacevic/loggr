import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import Promise from 'es6-promise';
import reducer from './reducers/';
import {history} from './core/router';
import {saveStore} from './core/storage';
import AppContainer from './containers/App';
import LogsContainer from './containers/Logs';
import ProjectsContainer from './containers/Projects';
import ReportsContainer from './containers/Reports';

// build ./dist/css/bundle.css
require('./_assets/styles/app.scss');

// apply browser polyfills
Promise.polyfill();

// define application middleware
let middleware = [
  thunkMiddleware,
  promiseMiddleware
];
middleware.push(createLogger({
  // log as plain JS, not Immutable.Map
  stateTransformer: state => {
    return state.toJS();
  }
}));

// create store with middleware
const store = applyMiddleware(...middleware)(createStore)(reducer);

// save store to local storage on each change
store.subscribe(() => {
  saveStore(store.getState().toJS());
});

// render to document
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Redirect from="/" to="/logs" />
      <Route component={AppContainer} path="/">
        <Route component={LogsContainer} path="logs" />
        <Route component={ProjectsContainer} path="projects" />
        <Route component={ReportsContainer} path="reports" />
        <Redirect from="*" to="/timer" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('react-dom')
);
