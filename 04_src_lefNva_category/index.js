import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
//从react-redux引入Provider顶级组件
import {Provider} from 'react-redux'
import store from './redux/store'
import App from './App';

ReactDOM.render(
  <Provider store ={store}>
    <BrowserRouter>
      <App />
   </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
