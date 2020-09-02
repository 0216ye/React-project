import {INCREMENT,SUBDUCTION} from '../action_types'
//创建一个同步分发的action，用于增加
export const createIncrement = value =>  ({type:INCREMENT,data:value} ) 
//创建一个同步分发的action，用于减少
export const createSubduction = value =>({type:SUBDUCTION,data:value} ) 

//创建一个异步的action，用于组件
export const  createIncrementAsync = (value,delay) =>{
    
    return (dispatch)=>{
        setTimeout(()=>{
            //最终返回一个action对象
            dispatch(createIncrement(value))
        },delay)
    }


}