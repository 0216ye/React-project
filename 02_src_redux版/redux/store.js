import {createStore} from 'redux' 
import reducer from './reducer'

//createStore(reducer)：入reducer参数，创建一个store对象
export default createStore(reducer)