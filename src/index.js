import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import 'semantic-ui-css/semantic.min.css';
// import registerServiceWorker from './registerServiceWorker';


render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
