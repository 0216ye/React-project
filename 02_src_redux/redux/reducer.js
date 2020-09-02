import {INCREMENT,SUBDUCTION} from './action_types'
//reducer为一个函数:传入两个参数：旧的状态preState和标记的动作的action（type和数据）
const initCount = 0 
export default function operationCount(preState = initCount,action){//ES6的形参默认赋值
    console.log('-----',action)//{type: "increment", data: 1}
    let {type,data}  = action
    //reudx推荐使用switch和规定不能修改preState
    let newState
    switch (type) {
        case INCREMENT  :
            newState = preState+data*1
            return newState
        case SUBDUCTION:
            newState = preState - data*1
            return newState
        default: 
            return preState 
    }
}