const CLIENT_ID = '81f8ff2fd1fa4537b7fc19a86ff6175a';
const REDIRECT_URI = 'http://spotify-client.skidledd.now.sh';
export const AUTHORIZE_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&state=421`;

export const SPOTIFY_API = 'https://api.spotify.com/v1/';
export const GET_CATEGORIES = `${SPOTIFY_API}browse/categories?limit=10&country=cz`;
