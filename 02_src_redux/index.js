import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import App from './App';


ReactDOM.render(<App  store = {store} />, document.getElementById('root'));
//redux底层更新了状态的值后，并不会像React一样将新的数据渲染到页面上


//通过store中的subcribe方法，每个更新状态时，会自动执行回调函数！
store.subscribe(()=>{
  ReactDOM.render(<App  store = {store} />, document.getElementById('root'));
})