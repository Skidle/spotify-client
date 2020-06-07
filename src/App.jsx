import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import RouteWithLayout from './layout/RouteWithLayout';
import CategoriesContainer from './containers/CategoriesContainer';
import PlaylistsContainer from './containers/PlaylistsContainer';
import TracksContainer from './containers/TracksContainer';

function App() {
  return (
    <Router>
      <Switch>
        <RouteWithLayout path="/" exact component={CategoriesContainer} />
        <RouteWithLayout path="/:categoryId" exact component={PlaylistsContainer} />
        <RouteWithLayout path="/:categoryId/:playlistId" component={TracksContainer} />
      </Switch>
    </Router>
  );
}

export default App;
