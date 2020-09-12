import {SAVE_USERINFO_LIST} from '../action_types'

//初始化redux状态的值
let initStore = []
export default  function test(preStore = initStore,action){
    let {type,data} = action 
    let newStore
    switch (type) {
        case SAVE_USERINFO_LIST:
            newStore  = [...data]
            return newStore
        default:
            return preStore
    }
}
