## Extra

### Async actions

We're using asynchronous API (it can return results with delay or not give us anything at all) but we're not handling this correctly.

E.g. if we don't have any categories in the store, we just show `Loading...`, but API request may have failed completely and we should show the error to the user and a possible exit out of this Error state.

We need to add status of the API call to the store. If we just started sending the request, status would be `fetching` (API call in progress), if request failed, then it's `failure` and finally if we received the data, it's `success`. Exact names are not important, but there should be some consistency.

Let's add action creators for these 3 statuses:

```js
// actions/index.js

// Before

export const fetchCategories = () => dispatch => {
  sendRequest(GET_CATEGORIES)
    .then(response => response.json())
    .then(({ categories }) => {
      const transformedCategories = transformCategories(categories);

      return dispatch({ type: 'CATEGORIES_FETCH', categories: transformedCategories });
    });
};

// After

export const fetchCategoriesStart = () => ({
  type: 'CATEGORIES_FETCH_START',
});

export const fetchCategoriesFailure = error => ({
  type: 'CATEGORIES_FETCH_FAILURE',
  error, // logging the error too, in case we decide to treat it later
});

export const fetchCategoriesSuccess = categories => ({
  type: 'CATEGORIES_FETCH_SUCCESS',
  categories,
});

export const fetchCategories = () => dispatch => {
  dispatch(fetchCategoriesStart());
  sendRequest(GET_CATEGORIES)
    .then(response => response.json())
    .then(({ categories }) => {
      const transformedCategories = transformCategories(categories);

      return dispatch(fetchCategoriesSuccess(transformedCategories));
    })
    .catch(error => dispatch(fetchCategoriesFailure(error)));
};
```

Now we need to add these action types to our categories reducer:
```js
// reducers/index.js

const categories = (state = {}, action) => {
  switch (action.type) {
    case 'CATEGORIES_FETCH_START':
      return {
        ...state,
        status: 'fetching',
      };
    case 'CATEGORIES_FETCH_SUCCESS':
      return {
        ...state,
        ...action.categories,
        status: 'success',
      };
    case 'CATEGORIES_FETCH_FAILURE':
      return {
        ...state,
        status: 'failure',        
      };
    default:
      return state;
  }
};
```

Great, we have all async statuses in the store, let's add a selector for it and update `CategoriesContainer.jsx`:
```js
// selectors/index.js

export const getCategoriesStatus = createSelector(
  getCategories,
  categories => categories.status,
);

// CategoriesContainer.jsx

import { Spin, Empty, Button } from 'antd';

const CategoriesContainer = ({ initFetch, categoryIds, status }) => {
  useEffect(() => {
    initFetch();
  }, [initFetch]);

  if (status === 'fetching') {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (status === 'failure') {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%', margin: '-90px 0 0 -100px' }}>
        <Empty>
          <Button type="primary" onClick={() => initFetch()}>Try again</Button>
        </Empty>
      </div>
    );
  }

  return (
    ...
  );
};

const mapStateToProps = (state, props) => ({
  categoryIds: getCategoryIds(state, props),
  status: getCategoriesStatus(state, props),
});

...
```
Fetching
![spin](https://user-images.githubusercontent.com/22978238/84229004-cdcb2a80-aae8-11ea-9250-cadd11c6e845.gif)

Failure and retry
![error](https://user-images.githubusercontent.com/22978238/84229014-d4f23880-aae8-11ea-9a9f-bf9fe6cb8cdc.gif)

### Exercise

As usual, try handling fetching and failure statuses for playlists and tracks, it'll be practically the same. Solutions are in `extra-solution` branch :)

---------------------

### Generating reducers

Last but not least we're going to reduce the boilerplate code for creating reducers (pun not intended). 

We can turn this:

```js
const categories = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIES_FETCH_START:
      return {
        ...state,
        status: 'fetching',
      };
    case CATEGORIES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.categories,
        status: 'success',
      };
    case CATEGORIES_FETCH_FAILURE:
      return {
        ...state,
        status: 'failure',
      };
    default:
      return state;
  }
};
```

into this slightly shorter and more readable version:

```js
const categories = createReducer({}, {
  [CATEGORIES_FETCH_START]: (state, action) => {
    ...state,
    status: 'fetching',
  },
  [CATEGORIES_FETCH_SUCCESS]: (state, action) => {
    ...state,
    ...action.categories,
    status: 'success',
  },
  [CATEGORIES_FETCH_FAILURE]: (state, action) => {
    ...state,
    status: 'failure',
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
      status: 'fetching',
    },
  },
  [PLAYLISTS_FETCH_SUCCESS]: (state, action) => {
    ...state,
    [action.categoryId]: {
      ...state[action.categoryId],
      ...action.playlists,
      status: 'success',
    },
  },
  [PLAYLISTS_FETCH_FAILURE]: (state, action) => {
    ...state,
    [action.categoryId]: {
      ...state[action.categoryId],
      status: 'failure',
    },
  },
});

const tracks = createReducer({}, {
  [TRACKS_FETCH_START]: (state, action) => {
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
      status: 'fetching',
    },
  }
  [TRACKS_FETCH_SUCCESS]: (state, action) => {
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
      ...action.tracks,
      status: 'success',
    },
  },
  [TRACKS_FETCH_FAILURE]: (state, action) => {
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
      status: 'failure',
    },
});
```
</details>
