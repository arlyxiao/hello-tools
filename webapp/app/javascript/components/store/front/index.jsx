import { createStore } from 'redux';

import rootReducer from './reducers';

let devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  devTool
);

export default store;
