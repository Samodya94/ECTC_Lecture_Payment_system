import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';

//const mongoose = require('mongoose')
const root = ReactDOM.createRoot(document.getElementById('root'));
//mongoose.set('strictQuery', false);
//mongoose.set('strictQuery', true);

root.render(
  <Provider store={store}> 
    <PersistGate persistor={persistor}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </PersistGate>
  </Provider>
);


