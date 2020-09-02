//容器组件
import Count from '../components/count'
import {connect} from 'react-redux'
import {createIncrement,createSubduction,createIncrementAsync} from '../redux/actions/count_action_creators'

/*完整的简写 -->只需要写以下代码，则可以实现上面的所有代码的效果 
    connet方法是一个高级函数:接受函数参数，并且返回函数
*/
export default connect(
    state => ({count:state.count}),
    {
        increment:createIncrement,
        subduction:createSubduction,
        incrementAsync:createIncrementAsync
    }
)(Count)
