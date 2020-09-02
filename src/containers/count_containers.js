//容器组件
import Count from '../components/count'
import {connect} from 'react-redux'
import {createIncrement,createSubduction} from '../redux/action_creators'

//底层调用时会自动传入一个state实参
// function mapStateToProps(state){
//     //返回的对象会倍存储到UI组件的Props属性中
//     return {count:state}
// }
//底层调用时会自动传入一个dispatch实参
// function mapDispatchToProps(dispatch){
//     return {
//         increment: value =>{dispatch(createIncrement(value))},
//         subduction:value => {dispatch(createSubduction(value))}
//     }
// }

//简写方法
// const mapStateToProps = state => ({count:state})
// const mapDispatchToProps = dispatch => ({
//     increment: value =>{dispatch(createIncrement(value))},
//     subduction:value => {dispatch(createSubduction(value))}
// })

//完整写法--->建立UI组件和容器组件的联系
// export default connect(mapStateToProps,mapDispatchToProps)(Count)



/*完整的简写 -->只需要写以下代码，则可以实现上面的所有代码的效果 
    connet方法是一个高级函数:接受函数参数，并且返回函数
*/
export default connect(
    state => ({count:state}),
    {
        increment:createIncrement,
        subduction:createSubduction
    }
)(Count)



/*
如果connect函数的第二个参数传递的是：mapDispatchToProps
 那么UI组件接收到的increment是:(value)=>{dispatch(createSubduction(value))}


如果connect函数的第二个参数传递的是：{ subduction:createSubduction}
    那么UI组件接收到的increment是:(value)=>{dispatch(createSubduction(value))}


        因为connect是一个高阶函数，返回的是一个函数，底层会自动加上dispatch和value参数
*/
