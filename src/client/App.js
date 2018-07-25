import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from './router/AppRouter';
import './styles/styles.scss';

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
