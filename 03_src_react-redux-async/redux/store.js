import {createStore,applyMiddleware} from 'redux' 
import reducer from './reducer'
//引入用于异步的thunk
import thunk from 'redux-thunk'

//createStore(reducer)：传入reducer参数，和执行异步的applyMiddleware(执行中间件)的方法，创建一个store对象
export default createStore(reducer,applyMiddleware(thunk))