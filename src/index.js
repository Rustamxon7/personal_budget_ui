import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/configureStore';
import { api } from './api/api';
import './index.css';
import App from './App';

api.interceptors.request.use((config) => {
  const { auth: { token } } = store.getState();
  const authConfig = { ...config };
  if (token) {
    authConfig.headers.Authorization = token;
  }
  return authConfig;
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    store.dispatch({ type: 'LOGOUT' });
  }
  throw error;
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
