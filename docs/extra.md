## Extra

### Async actions

We're using asynchronous API (it can return results with delay or not give us anything at all) but we're not handling this correctly.

E.g. if we don't have any categories in the store, we just show `Loading...`, but API request may have failed completely and we should show the error to the user and a possible exit out of this Error state.

Also if you load the app, open one of the playlists, then click on the logo to go back, and open Redux dev tools, you can see that we've just fetched categories twice (even though these are identical data). It might not be that visible for a small app and when you have decent Internet connection, but it's still a problem worth solving. 

TBA steps

---------------------

### Generating reducers

Last but not least we're going to reduce the boilerplate code for creating reducers (pun not intended). 

We can turn this:

```js
const initialEntitiesState = {
  data: {},
  ids: [],
};

const categories = (state = initialEntitiesState, action) => {
  switch (action.type) {
    case CATEGORIES_FETCH_START:
      return {
        ...state,
      };
    case CATEGORIES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.categories,
      };
    case CATEGORIES_FETCH_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
```

into this slightly shorter and more readable version:

```js
const categories = createReducer(initialEntitiesState, {
  [CATEGORIES_FETCH_START]: (state, action) => {
    ...state,
  },
  [CATEGORIES_FETCH_SUCCESS]: (state, action) => {
    ...state,
    ...action.categories,
  },
  [CATEGORIES_FETCH_FAILURE]: (state, action) => {
    ...state,
  },
});
```

This is possible thanks to `createReducer` [helper](https://redux.js.org/recipes/reducing-boilerplate#generating-reducers):

```js
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
```

### Exercise

Add our `createReducer` helper to `src/utils.js` and use it in all our reducers (see categories example above).

<details>
  <summary>Solution</summary>

```js
// reducers/index.js

const playlists = createReducer({}, {
  [PLAYLISTS_FETCH_START]: (state, action) => {
    ...state,
    [action.categoryId]: {
      ...state[action.categoryId],
    },
  },
  [PLAYLISTS_FETCH_SUCCESS]: (state, action) => {
    ...state,
    [action.categoryId]: {
      ...state[action.categoryId],
      ...action.playlists,
    },
  },
  [PLAYLISTS_FETCH_FAILURE]: (state, action) => {
    ...state,
    [action.categoryId]: {
      ...state[action.categoryId],
    },
  },
});

const tracks = createReducer({}, {
  [TRACKS_FETCH_START]: (state, action) => {
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
    },
  }
  [TRACKS_FETCH_SUCCESS]: (state, action) => {
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
      ...action.tracks,
    },
  },
  [TRACKS_FETCH_FAILURE]: (state, action) => {
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
    },
});

```
</details>
