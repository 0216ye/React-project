 import {INCREMENT,SUBDUCTION} from './action_types'
export const createIncrement = value =>  ({type:INCREMENT,data:value} ) 
export const createSubduction = value =>({type:SUBDUCTION,data:value} ) 