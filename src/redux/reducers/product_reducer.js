import {SAVE_PRODUCT_LIST} from '../action_types'

//初始化redux状态的值
let initStore = []
export default  function test(preStore = initStore,action){
    let {type,data} = action 
    let newStore
    switch (type) {
        case SAVE_PRODUCT_LIST:
            //因为test是一个纯函数(传入的参数一样，则返回的内容一样)，尽量不要修改参数，
            newStore  = [...data]
            return newStore
        default:
            return preStore
    }
}
