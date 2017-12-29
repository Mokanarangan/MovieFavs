import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import App from './App';
import store from './stores';
import './index.css';

// https://redux.js.org/docs/advanced/UsageWithReactRouter.html
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path="/" exact />
          <Route path="/top-picks" />
          <Route path="/my-movies" />
          <Route path="/my-account" />
          <Route path="/login" />
          <Route path="/logout" />
          <Redirect to="/" />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
