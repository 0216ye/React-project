//核心的store管理者
import {createStore,applyMiddleware} from 'redux'
//引入redux文件
import reducers from './reducers/index'
//引入用于异步的thunk
import thunk from 'redux-thunk'
//引入redux浏览器调试工具
import { composeWithDevTools } from 'redux-devtools-extension'
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

  
