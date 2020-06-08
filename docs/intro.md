## Intro

Redux is a library that is often used to manage data layer in a React application. Official docs offer a very concise description of it:

> The whole state of your app is stored in an object tree inside a single _store_. The only way to change the state tree is to emit an _action_, an object describing what happened. To specify how the actions transform the state tree, you write pure _reducers_.

Let's describe these concepts in a little more detail, using a simple example. Imagine that a user clicks to open sidebar in our app.

So we dispatch an **action**, plain JS object that must have a _type_ property:

  ```js
  { type: 'OPEN_SIDEBAR', opened: true }
  ```
   Action is then sent to a **reducer**, pure function that tells us how to change state based on the action:
   
  ```js
  const initialState = { opened: false };
  
  function sidebar(state = initialState, action) {
    switch (action.type) {
      case OPEN_SIDEBAR:
        return {
          ...state,
          opened: action.opened,
        },
    default:
      return state;
    }
  }
  ```
    
   Reducer updates **store**, that is an object that holds the application state. We create only 1 store per Redux app:
   
  ```js
  import { createStore } from 'redux';
  import sidebar from './reducers';
  
  const store = createStore(sidebar);
  ```

   
   Now let's open that sidebar:
   
  ```js
  console.log(store.getState()); // { sidebar: { opened: false }}
  
  store.dispatch({ type: 'OPEN_SIDEBAR', opened: true }};
  
  console.log(store.getState()); // {sidebar: { opened: true }};
  ```
 
:tada:

To recap, this is how data flows in a Redux app:
**![](https://lh5.googleusercontent.com/6xgDxUBHqjvTZMlNAOUwEM-E5qDBCG-olocUlzxqKnGLxwX4uuNr_Y4RpnPmSgUcI1e3uvHQ_IFay0lS5TQXCqOJsmCJwqpatpL8Py2obSRBDJGpBn76rMSFMeXo8LcNn1Ds3Xnwp6I)**