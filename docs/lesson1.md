## Lesson 1

#### What with all those files?
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

#### Now let's add Redux!

Install `redux` , `react-redux` libraries and developer tools:

    yarn add redux
    yarn add react-redux
    yarn add redux-devtools --dev
