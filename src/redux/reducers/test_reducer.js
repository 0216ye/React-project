import {TEST1,TEST2} from '../action_types'
let initStore = 'hello' 
export default  function test(preStore = initStore,action){
    let {type,data} = action
    let newStore
    switch (type) {
        case TEST1:
            newStore  = preStore + data
            return newStore
        case TEST2:
            newStore  = preStore +  data + "!"
            return newStore
        default:
            return preStore
    }
}
