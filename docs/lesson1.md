## Lesson 1

### What with all those files?
Before we start with Redux, let's take a look at the React app we have here:

	public/
	src/
	  components/
		Category.jsx
		Playlist.jsx
		Track.jsx
	  containers/
	    CategoriesContainer.jsx
	    PlaylistsContainer.jsx
	    TracksContainer.jsx
	  layout/
	    Layout.jsx
	    RouteWithLayout.jsx
	  App.jsx
	  constants.js
	  dummy.json
	  index.jsx
	  logo.png
	  utils.js
	package.json	

We're going to use [Spotify API](https://developer.spotify.com/documentation/web-api/reference/) for this app, so we have components for Categories, Playlists and Tracks. Right now the app uses dummy data from `dummy.json`, it's not connected to the API yet.
To authorize for the  API we're redirecting user to sign-in form on Spotify website and then back to our app. When user sign-ins, we get an _access token_ from the URL and store it in local storage:
	
	export const authorizeUser = () => {
	  const accessToken = getUrlAccessToken();
	  
	  if (accessToken) {
	    global.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
	  }
	};
And then on every request to the API, we retrieve the access token from local storage. It only lives for 1 hour, so when it expires, we simply redirect user to sign-in form again. For more detail on how to authorize with Spotify check out [official guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow).

We use [React Router](https://reacttraining.com/react-router/web/guides/quick-start) here to switch between pages and [Ant Design](https://ant.design/components/overview/) library to make our app a bit prettier.

----------
### Let's add Redux!

Install `redux`, `react-redux`, `redux-thunk` libraries and developer tools:

    yarn add redux
    yarn add react-redux
    yarn add redux-thunk
    yarn add redux-devtools --dev

Let's create a Redux store first, add `store.js` file to `src/` folder with the following [content](https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup):

```js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // allows us to have actions as functions

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  state => state, // fake reducer
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
```

The store is created, now we need to provide it to the app, so in `src/index.jsx` we add `Provider` to the topmost level:

```js
import { Provider } from  'react-redux';
import  store  from  './store';

ReactDOM.render(
  <Provider  store={store}>
    <App  />
  </Provider>,
  document.getElementById('root'),
);
```

Now try running the app and open redux dev tools extension, you should see this:
![image](https://user-images.githubusercontent.com/22978238/83983058-80ee2500-a92b-11ea-8c62-5fece1a3bc56.png)

That means the store is there, `@@INIT` is the Redux's default action to initialize reducers.

Now let's add some reducer(s).
There are [multiple ways](https://redux.js.org/faq/code-structure#code-structure) how to structure your Redux app. For this app we're going to have all your reducers in a separate folder and have 1 reducer per type of data. So 3 in total: 1 for _categories_, 1 for _playlists_ and 1 for _tracks_.

Create a `src/reducers/` folder and add `index.js` file. `categories` reducer is going to store categories, that we will have fetched by `CATEGORIES_FETCH` action:

```js
import { combineReducers } from  'redux';

const categories = (state = {}, action) => {
  switch (action.type) {
    case 'CATEGORIES_FETCH':
      return {
        ...state, // creates a new copy of state object
        ...action.categories,
      };
      default:
        return state;
  }
};

export default combineReducers({
  categories
});
```

We used Redux's `combineReducers` utility for convenience, it calls reducers with the slices of state selected according to their keys, and combines their results into a single object again. And now we can use this new reducer in `store.js` instead of our faked one:

```js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
```

Now that we have store and reducer, let's add this `CATEGORIES_FETCH` action to use fetch categories.
Create `src/actions/` folder and add `index.js` file with following:

```js
import { GET_CATEGORIES } from  '../constants';
import { sendRequest } from '../utils'; 

export const fetchCategories = () => dispatch => {
  sendRequest(GET_CATEGORIES) // fetching data from categories endpoint
    .then(response => response.json())
    .then(({ categories }) => dispatch({ type: 'CATEGORIES_FETCH', categories })); // dispatching action to store categories
};
```

We have all 3 main Redux parts ready, now it's time to connect one of our React components to Redux.

React components are divided into `components/` and `containers/` folders: `containers` are going to be "smart", connected to Redux, will be able to dispatch actions and get props from state. `components` on the other hand, will be "dumb", presenting only whatever props they receive.

Open `CategoriesContainer.jsx` and add following to connect this component to Redux:

```js
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';

const mapDispatchToProps = dispatch => ({
  initFetch: () => dispatch(fetchCategories()),
});

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesContainer);
```

Now since we've added connected props, you can remove default dummy ones:

```js
CategoriesContainer.defaultProps = {
  initFetch: noop,
  categories: DUMMY_CATEGORIES,
};
```

Now you should see `CATEGORIES_FETCH` and updated state in Redux dev tools.

We fetched some real data, stored them in Redux and represented them in the view 🎉

----------

### Exercise

Try following the same steps for Playlists: you need to create an action to fetch them, a reducer to store them and then connect `PlaylistsContainer` to the store.

_Hints_:

- Your state should look like this:

```
playlists: {
  [categoryId_1]: {
    ...,
    items,
  },
  [categoryId_2]: {
    ...,
    items,
  }
}
```

- You can access current `categoryId` from route as `props.match.params.categoryId`.

--------------------

<details>
  <summary>Solution for playlists</summary>
  
  ```js
  // reducers/index.js

  const playlists = (state = {}, action) => {
    switch (action.type) {
      case 'PLAYLISTS_FETCH':
        return {
          ...state,
          [action.categoryId]: { ...action.playlists },
        };
        default:
          return state;
    }
  };

  export default combineReducers({
    categories,
    playlists,
  });
  ```

  ```js
  // actions/index.js

  export const fetchPlaylists = categoryId => dispatch => {
    sendRequest(getCategoryPlaylistsUrl(categoryId))
      .then((response) => response.json())
      .then(({ playlists }) => dispatch({ type: 'PLAYLISTS_FETCH', playlists, categoryId }));
  };
  ```
  
  ```js
  // PlaylistsContainer.jsx

  const mapStateToProps = (state, props) => ({
    playlists: state.playlists,
    categoryId: props.match.params.categoryId,
  });

  const mapDispatchToProps = dispatch => ({
    initFetch: categoryId => dispatch(fetchPlaylists(categoryId)),
  });
  ```
</details>

Tracks part is very similar to playlists, try doing it yourself and then check out the solution in `lesson-1-solution` branch.
