const TOKEN = 'BQCsGq3ocHhss-dhPjouN5VEyyTAKYThmAhfuwF70a-gc84wZ5I2Z6Pcfh1kN29PjpNrrn9dJ_YvXfuoV_GIZXCMqbZqyOyR8FK2wwX3y_4buknxUailQHUNvLNJo0ytDL0kpjVg7lupif_YkkfjPI_C1P2XF0grp0M';
const GET_CATEGORIES = 'https://api.spotify.com/v1/browse/categories?limit=10';
const getCategoryPlaylistsUrl = (categoryId) => `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=10`;

const sendRequest = (url, token) => new Request(url, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const fetchCategories = (dispatch) => {
  fetch(sendRequest(GET_CATEGORIES, TOKEN))
    .then((response) => response.json())
    .then((json) => dispatch({ type: 'CATEGORIES_FETCH', categories: json.categories }));
};

export const fetchPlaylists = (dispatch, categoryId) => {
  fetch(sendRequest(getCategoryPlaylistsUrl(categoryId), TOKEN))
    .then((response) => response.json())
    .then((json) => dispatch({ type: 'CATEGORY_PLAYLISTS_FETCH', playlists: json.playlists, categoryId }));
};
