import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import Home from './containers/Home/Home';
import AddEntry from './containers/AddEntry/AddEntry';
import NotFoundView from './views/NotFoundView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/add" component={AddEntry} />
    <Route path="404" component={NotFoundView} />
    <Redirect from="*" to="404" />
  </Route>
);
