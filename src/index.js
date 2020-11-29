import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';

const store = createStore(reducer);


ReactDOM.render(  
  <Provider store={store}>
<BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</BrowserRouter>
</Provider>
 , document.getElementById( 'root' ) );


serviceWorker.unregister();
