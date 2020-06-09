## Lesson 2 - refactoring

### Refactoring

Our application works but we don't really follow best practices in the code, which might lead to poor performance and readability, harder debugging, and other problems in the future. We can also view this refactoring as an opportunity to learn something new. Let's start by looking at our current state.

### State normalization

<details>
  <summary>Subset of the state</summary>
  
  ```js
  {
  categories: {
    href: 'https://api.spotify.com/v1/browse/categories?country=CZ&offset=0&limit=10',
    items: [
      {
        href: 'https://api.spotify.com/v1/browse/categories/toplists',
        icons: [
          {
            height: 275,
            url: 'https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg',
            width: 275
          }
        ],
        id: 'toplists',
        name: 'Top Lists'
      },
      {
        href: 'https://api.spotify.com/v1/browse/categories/pop',
        icons: [
          {
            height: 274,
            url: 'https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg',
            width: 274
          }
        ],
        id: 'pop',
        name: 'Pop'
      },
    ],
    limit: 10,
    next: 'https://api.spotify.com/v1/browse/categories?country=CZ&offset=10&limit=10',
    offset: 0,
    previous: null,
    total: 37
  },
  playlists: {
    pop: {
      href: 'https://api.spotify.com/v1/browse/categories/pop/playlists?offset=0&limit=10',
      items: [
        {
          collaborative: false,
          description: '50 nejúspěšnějších hitů v České republice. Cover: Ava Max',
          external_urls: {
            spotify: 'https://open.spotify.com/playlist/37i9dQZF1DX1kQODfnjf4u'
          },
          href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX1kQODfnjf4u',
          id: '37i9dQZF1DX1kQODfnjf4u',
          images: [
            {
              height: null,
              url: 'https://i.scdn.co/image/ab67706f00000002c25c6662923b5478422b392b',
              width: null
            }
          ],
          name: 'Top Hits Česká republika',
          owner: {
            display_name: 'Spotify',
            external_urls: {
              spotify: 'https://open.spotify.com/user/spotify'
            },
            href: 'https://api.spotify.com/v1/users/spotify',
            id: 'spotify',
            type: 'user',
            uri: 'spotify:user:spotify'
          },
          primary_color: null,
          'public': null,
          snapshot_id: 'MTU5MTIyMTcyMCwwMDAwMDAxZjAwMDAwMTcyN2MzNDk0MDgwMDAwMDE3MjdhMjM4MGYx',
          tracks: {
            href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX1kQODfnjf4u/tracks',
            total: 50
          },
          type: 'playlist',
          uri: 'spotify:playlist:37i9dQZF1DX1kQODfnjf4u'
        },
        {
          collaborative: false,
          description: 'To nejzajímavější ze současné popové scény v Čechách a na Slovensku. Cover: Lenny',
          external_urls: {
            spotify: 'https://open.spotify.com/playlist/37i9dQZF1DXbQFxYbaFVh1'
          },
          href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXbQFxYbaFVh1',
          id: '37i9dQZF1DXbQFxYbaFVh1',
          images: [
            {
              height: null,
              url: 'https://i.scdn.co/image/ab67706f00000002dcdba5172125e93cad27b340',
              width: null
            }
          ],
          name: 'Pop list',
          owner: {
            display_name: 'Spotify',
            external_urls: {
              spotify: 'https://open.spotify.com/user/spotify'
            },
            href: 'https://api.spotify.com/v1/users/spotify',
            id: 'spotify',
            type: 'user',
            uri: 'spotify:user:spotify'
          },
          primary_color: null,
          'public': null,
          snapshot_id: 'MTU5MTIyMTcyMCwwMDAwMDAxNjAwMDAwMTcyN2MzNDk0MDgwMDAwMDE3MjdhNjhkZTNm',
          tracks: {
            href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXbQFxYbaFVh1/tracks',
            total: 60
          },
          type: 'playlist',
          uri: 'spotify:playlist:37i9dQZF1DXbQFxYbaFVh1'
        },
      ],
      limit: 10,
      next: 'https://api.spotify.com/v1/browse/categories/pop/playlists?offset=10&limit=10',
      offset: 0,
      previous: null,
      total: 41
    }
  },
  tracks: {
    '37i9dQZF1DXcBWIGoYBM5M': {
      '0': {
        added_at: '2020-06-08T04:01:00Z',
        added_by: {
          external_urls: {
            spotify: 'https://open.spotify.com/user/'
          },
          href: 'https://api.spotify.com/v1/users/',
          id: '',
          type: 'user',
          uri: 'spotify:user:'
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: 'album',
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/4r63FhuTkUYltbVAg5TQnk'
                },
                href: 'https://api.spotify.com/v1/artists/4r63FhuTkUYltbVAg5TQnk',
                id: '4r63FhuTkUYltbVAg5TQnk',
                name: 'DaBaby',
                type: 'artist',
                uri: 'spotify:artist:4r63FhuTkUYltbVAg5TQnk'
              }
            ],
            available_markets: [
              'AD',
              'AE',
              'AR',
              'AT',
              'AU',
              'BE',
              'BG',
              'BH',
              'BO',
              'BR',
              'CA',
              'CH',
              'CL',
              'CO',
              'CR',
              'CY',
              'CZ',
              'DE',
              'DK',
              'DO',
              'DZ',
              'EC',
              'EE',
              'EG',
              'ES',
              'FI',
              'FR',
              'GB',
              'GR',
              'GT',
              'HK',
              'HN',
              'HU',
              'ID',
              'IE',
              'IL',
              'IN',
              'IS',
              'IT',
              'JO',
              'JP',
              'KW',
              'LB',
              'LI',
              'LT',
              'LU',
              'LV',
              'MA',
              'MC',
              'MT',
              'MX',
              'MY',
              'NI',
              'NL',
              'NO',
              'NZ',
              'OM',
              'PA',
              'PE',
              'PH',
              'PL',
              'PS',
              'PT',
              'PY',
              'QA',
              'RO',
              'SA',
              'SE',
              'SG',
              'SK',
              'SV',
              'TH',
              'TN',
              'TR',
              'TW',
              'US',
              'UY',
              'VN',
              'ZA'
            ],
            external_urls: {
              spotify: 'https://open.spotify.com/album/623PL2MBg50Br5dLXC9E9e'
            },
            href: 'https://api.spotify.com/v1/albums/623PL2MBg50Br5dLXC9E9e',
            id: '623PL2MBg50Br5dLXC9E9e',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab67616d0000b27320e08c8cc23f404d723b5647',
                width: 640
              },
              {
                height: 300,
                url: 'https://i.scdn.co/image/ab67616d00001e0220e08c8cc23f404d723b5647',
                width: 300
              },
              {
                height: 64,
                url: 'https://i.scdn.co/image/ab67616d0000485120e08c8cc23f404d723b5647',
                width: 64
              }
            ],
            name: 'BLAME IT ON BABY',
            release_date: '2020-04-17',
            release_date_precision: 'day',
            total_tracks: 13,
            type: 'album',
            uri: 'spotify:album:623PL2MBg50Br5dLXC9E9e'
          },
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/4r63FhuTkUYltbVAg5TQnk'
              },
              href: 'https://api.spotify.com/v1/artists/4r63FhuTkUYltbVAg5TQnk',
              id: '4r63FhuTkUYltbVAg5TQnk',
              name: 'DaBaby',
              type: 'artist',
              uri: 'spotify:artist:4r63FhuTkUYltbVAg5TQnk'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/757aE44tKEUQEqRuT6GnEB'
              },
              href: 'https://api.spotify.com/v1/artists/757aE44tKEUQEqRuT6GnEB',
              id: '757aE44tKEUQEqRuT6GnEB',
              name: 'Roddy Ricch',
              type: 'artist',
              uri: 'spotify:artist:757aE44tKEUQEqRuT6GnEB'
            }
          ],
          available_markets: [
            'AD',
            'AE',
            'AR',
            'AT',
            'AU',
            'BE',
            'BG',
            'BH',
            'BO',
            'BR',
            'CA',
            'CH',
            'CL',
            'CO',
            'CR',
            'CY',
            'CZ',
            'DE',
            'DK',
            'DO',
            'DZ',
            'EC',
            'EE',
            'EG',
            'ES',
            'FI',
            'FR',
            'GB',
            'GR',
            'GT',
            'HK',
            'HN',
            'HU',
            'ID',
            'IE',
            'IL',
            'IN',
            'IS',
            'IT',
            'JO',
            'JP',
            'KW',
            'LB',
            'LI',
            'LT',
            'LU',
            'LV',
            'MA',
            'MC',
            'MT',
            'MX',
            'MY',
            'NI',
            'NL',
            'NO',
            'NZ',
            'OM',
            'PA',
            'PE',
            'PH',
            'PL',
            'PS',
            'PT',
            'PY',
            'QA',
            'RO',
            'SA',
            'SE',
            'SG',
            'SK',
            'SV',
            'TH',
            'TN',
            'TR',
            'TW',
            'US',
            'UY',
            'VN',
            'ZA'
          ],
          disc_number: 1,
          duration_ms: 181733,
          episode: false,
          explicit: true,
          external_ids: {
            isrc: 'USUM72007941'
          },
          external_urls: {
            spotify: 'https://open.spotify.com/track/7ytR5pFWmSjzHJIeQkgog4'
          },
          href: 'https://api.spotify.com/v1/tracks/7ytR5pFWmSjzHJIeQkgog4',
          id: '7ytR5pFWmSjzHJIeQkgog4',
          is_local: false,
          name: 'ROCKSTAR (feat. Roddy Ricch)',
          popularity: 99,
          preview_url: 'https://p.scdn.co/mp3-preview/187c800ce2279e1d8966b0a5fd8a9dabf6acd5c4?cid=81f8ff2fd1fa4537b7fc19a86ff6175a',
          track: true,
          track_number: 7,
          type: 'track',
          uri: 'spotify:track:7ytR5pFWmSjzHJIeQkgog4'
        },
        video_thumbnail: {
          url: null
        }
      },
    }
  },
}
  ```
  
</details>

It's pretty big for a simple app with 3 entities, we probably need only 1/3 of it. We can filter only the data that we need and most importantly we can organize (normalize) it, to make state as flat as possible.

We can normalize this data by dividing it into entities and keying it by id. If ordering is important, then we store an array of just the ids separately. See [documentation](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape) for details.

Let's apply this to our state:

<details>
  <summary>Normalized state</summary>

```js
{
  categories: {
    data: {
      toplists: {
        id: 'toplists',
        name: 'Top Lists',
        imageUrl: 'https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg'
      },
      at_home: {
        id: 'at_home',
        name: 'At Home',
        imageUrl: 'https://t.scdn.co/images/04da469dd7be4dab96659aa1fa9f0ac9.jpeg'
      },
    },
    ids: [
      'toplists',
      'at_home',
    ],
    status: 'success',
  },
  playlists: {
    rock: {
      status: 'success',
      data: {
        '37i9dQZF1DX4x0y4AP3Q3A': {
          id: '37i9dQZF1DX4x0y4AP3Q3A',
          name: 'Tylko Polski Rock',
          description: 'Najlepsi i najlepiej rockujący na polskiej scenie. Cover: Stach Bukowski',
          imageUrl: 'https://i.scdn.co/image/ab67706f000000025bf796e601d512b2ee1a988f'
        },
      },
      ids: [
        '37i9dQZF1DX4x0y4AP3Q3A',
      ]
    },
  },
  tracks: {
    '37i9dQZF1DX4x0y4AP3Q3A': {
      status: 'success',
      data: {
        '4r8QhhrnrytgjkDHzHjU8m': {
          id: '4r8QhhrnrytgjkDHzHjU8m',
          name: 'Kim Jestem?',
          imageUrl: 'https://i.scdn.co/image/ab67616d0000b2731df66aee0d06df1cfc71fe5e',
          artistNames: [
            'Lipali'
          ],
          popularity: 41,
          previewUrl: 'https://p.scdn.co/mp3-preview/87c5d5c40664578df6ed9e7167fc42ebcc50b9da?cid=81f8ff2fd1fa4537b7fc19a86ff6175a'
        },
      },
      ids: [
        '4r8QhhrnrytgjkDHzHjU8m',
      ]
    },
  }
}
```
</details>

To make it happen we need to clean up data either in reducers or in actions. In this tutorial we're going to transform data in actions. Since we get data as array of items, we can use [reduce method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), which can apply a function to an each element in the array.

Let's look at how we can trasform categories using reduce:
```js
// shape of categories that we get from the API
const categories = {
  href: 'https://api.spotify.com/v1/browse/categories?country=CZ&offset=0&limit=10',
  items: [
    {
      href: 'https://api.spotify.com/v1/browse/categories/toplists',
      icons: [
        {
          height: 275,
          url: 'https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg',
          width: 275
        }
      ],
      id: 'toplists',
      name: 'Top Lists'
    },
    {
      href: 'https://api.spotify.com/v1/browse/categories/pop',
      icons: [
        {
          height: 274,
          url: 'https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg',
          width: 274
        }
      ],
      id: 'pop',
      name: 'Pop'
    },
  ],
  limit: 10,
  next: 'https://api.spotify.com/v1/browse/categories?country=CZ&offset=10&limit=10',
  offset: 0,
  previous: null,
  total: 37
};

const transformCategories = data => {
  // We only need items array

  const { items } = data;

  const categoryItems = items.reduce((acc, item) => {
    const { id, name, icons } = item; // pick only props that we need to display

    // add object key to our accumulated object
    acc[id] = {
      id,
      name,
      imageUrl: icons[0].url, // we only need 1 image
    }
    
    return acc;
  }, {}); // we expect an object to be returned

  const ids = items.map(item => item.id); // array of ids to preserve ordering

  return {
    data: categoryItems,
    ids,
  }
};
```

First iteration of reduce method being called on items gives us this:
```js
{
  toplists: {
    id: 'toplists',
    name: 'Top Lists',
    imageUrl: 'https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg'
  },
}
```
Each subsequent iteration appends another keyed object to the result, until the end of items array. Finally we'll get an object of objects with as many children as there are elements in the input array.

We also map category ids to a separate array to preserve ordering. Result of calling `transformCategories` on input data looks like:
```js
{
  data: {
    toplists: {
      id: 'toplists',
      name: 'Top Lists',
      imageUrl: 'https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg'
    },
    pop: {
      id: 'pop',
      name: 'Pop',
      imageUrl: 'https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg'
    },
  },
  ids: [
    'toplists',
    'pop',
  ],
}
```

Now we just need to place `transformCategories` function in `src/utils` and use it in `fetchCategories` action:
```js
export const fetchCategories = (dispatch) => {
  sendRequest(GET_CATEGORIES)
    .then((response) => response.json())
    .then(({ categories }) => {
      const transformedCategories = transformCategories(categories);

      return dispatch({ type: CATEGORIES_FETCH, categories: transformedCategories });
    });
};
```

### Exercise

Try following the same steps for Playlists: you need to create a `transformPlaylists` function, using reduce method. The function should return:
```js
{
  data: {
    'playlist_id1': {
      id,
      name,
      description,
      imageUrl,
    },
  },
  ids: [
    'playlist_id1',
  ]
}
```

--------------------

<details>
  <summary>Solution for playlists</summary>
  
```js
// src/utils.js

const transformPlaylists = ({ items }) => {
  const playlistItems = items.reduce((acc, item) => {
    const { id, name, images, description } = item;

    acc[id] = {
      id,
      name,
      description,
      imageUrl: images[0].url,
    }

    return acc;
  }, {});

  const ids = items.map(item => item.id);

  return {
    data: playlistItems,
    ids,
  }
};

// actions/index.js
export const fetchPlaylists = (dispatch, categoryId) => {
  sendRequest(getCategoryPlaylistsUrl(categoryId))
    .then((response) => response.json())
    .then(({ playlists }) => {
      const transformedPlaylists = transformPlaylists(playlists);

      dispatch({ type: PLAYLISTS_FETCH, playlists: transformedPlaylists, categoryId })
    });
};

```
  
</details>

Tracks part is similar to the other entities, try doing it yourself and then check out the solution in `lesson-2-solution` branch.

-----------

### Selectors

[Selectors](https://redux.js.org/recipes/computing-derived-data) are functions that know a path to a particular subset of the state and then return derived data from it. 

We normalized the store, so that it has only relevant data with minimal levels of nesting. Now we can move the logic to compute derived data to selectors, this will cut down on repetition. We're also going to use [Reselect library](https://github.com/reduxjs/reselect), that has implemented caching for selectors.

TBA steps

---------------------

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
  status: '',
};

const categories = (state = initialEntitiesState, action) => {
  switch (action.type) {
    case CATEGORIES_FETCH_START:
      return {
        ...state,
        status: STATUS_FETCHING,
      };
    case CATEGORIES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.categories,
        status: STATUS_SUCCESS,
      };
    case CATEGORIES_FETCH_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE,
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
    status: STATUS_FETCHING,
  },
  [CATEGORIES_FETCH_SUCCESS]: (state, action) => {
    ...state,
    ...action.categories,
    status: STATUS_SUCCESS,
  },
  [CATEGORIES_FETCH_FAILURE]: (state, action) => {
    ...state,
    status: STATUS_FAILURE,
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
      status: STATUS_FETCHING,
    },
  },
  [PLAYLISTS_FETCH_SUCCESS]: (state, action) => {
    ...state,
    [action.categoryId]: {
      ...state[action.categoryId],
      ...action.playlists,
      status: STATUS_SUCCESS,
    },
  },
  [PLAYLISTS_FETCH_FAILURE]: (state, action) => {
    ...state,
    [action.categoryId]: {
      ...state[action.categoryId],
      status: STATUS_FAILURE,
    },
  },
});

const tracks = createReducer({}, {
  [TRACKS_FETCH_START]: (state, action) => {
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
      status: STATUS_FETCHING,
    },
  }
  [TRACKS_FETCH_SUCCESS]: (state, action) => {
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
      ...action.tracks,
      status: STATUS_SUCCESS,
    },
  },
  [TRACKS_FETCH_FAILURE]: (state, action) => {
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
      status: STATUS_FAILURE,
    },
});

```
</details>