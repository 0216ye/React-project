import {createStore,applyMiddleware} from 'redux' 
import reducer from './reducer'
//引入用于异步的thunk
import thunk from 'redux-thunk'
//引入redux浏览器调试工具
import { composeWithDevTools } from 'redux-devtools-extension'

//createStore(reducer)：传入reducer参数，和执行异步的applyMiddleware(执行中间件)的方法，创建一个store对象
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))