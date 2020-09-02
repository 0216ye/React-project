//用于汇总所有reducer文件
import countReducer from './count_reducer'
import personReducer from './person_reducer'
import {combineReducers}  from 'redux'


/*

    combineReducers方法，接收一个对象作为参数，
    对象中的key就是store中保存该状态的key
    对象中的value就是store中保存该状态的value
*/
export default combineReducers({
    count:countReducer,
    person:personReducer
})

/*
    store中保存的state，如下
        {
            count:0,
            person:[]
        }
*/