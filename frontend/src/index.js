import React        from 'react';
import ReactDOM     from 'react-dom';
import App          from './App';
import { Provider } from 'react-redux'
import store        from './store'
import './index.css';
// import './bootstrap.min.css';
// import './fonts/Arista-Pro/Arista-Pro-Alternate-SemiBold-trial.ttf'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

