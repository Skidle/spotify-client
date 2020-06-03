import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import RouteWithLayout from './containers/RouteWithLayout';
import CategoriesContainer from './containers/CategoriesContainer';
import Playlists from './containers/Playlists';

function App() {
  return (
    <Router>
      <Switch>
        <RouteWithLayout path="/" exact component={CategoriesContainer} />
        <RouteWithLayout path="/:categoryId" component={Playlists} />
      </Switch>
    </Router>
  );
}

export default App;
