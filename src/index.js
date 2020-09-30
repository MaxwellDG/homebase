import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as ReactRedux from 'react-redux'
import userReducer from './reducers/userReducer'
import collectionsReducer from './reducers/collectionsReducer'
import displayReducer from './reducers/displayReducer'
import urlsReducer from './reducers/urlsReducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
  userReducer,
  collectionsReducer,
  displayReducer,
  urlsReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <ReactRedux.Provider store={ store }>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </ReactRedux.Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
