import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './assets/css/index.css'
import './assets/css/grid.css'
import store from './store';
import { Provider } from 'react-redux';
import { Layout } from './components/layout/Layout';
import Login from './pages/Login';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
          <Route path="/app" component={Layout} />
          <Route exact path="/" component={Login} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
