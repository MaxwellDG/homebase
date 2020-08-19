import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as ReactRedux from 'react-redux'
import SettingsReducer from './reducers/reducer'
import { createStore } from 'redux'

const store = createStore(SettingsReducer)

ReactDOM.render(
  <ReactRedux.Provider store={ store }>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </ReactRedux.Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
