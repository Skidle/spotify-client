const TOKEN = 'BQAzYUIMQboZdBe36xmOgEr6SMcrtt2GwD3WyCwnpLsPSCWWsJVxS189gutQWymEyHHMd7xfYwgj6O7vh3gEKPBRhzCIiY1mgC35RQIToT9lzDTEyIUinXFHPP4k-H1w2ld3V_yNkS1qTmQX_IXGreWsfBIEqjmepLI';
const GET_CATEGORIES = 'https://api.spotify.com/v1/browse/categories?limit=10';

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
