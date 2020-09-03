//汇总所有reducer文件
import {combineReducers} from 'redux'
import testReducer from './test_reducer'


//汇总
export default combineReducers({
 /*
    combineReducers方法，接收一个对象作为参数，
    对象中的key就是store中保存该状态的key
    对象中的value就是store中保存该状态的value
*/
    test:testReducer
})
