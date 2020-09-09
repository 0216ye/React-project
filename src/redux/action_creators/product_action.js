import { SAVE_PRODUCT_LIST } from '../action_types'
//用于Login表单用户登录的方法
export const createSaveProductList = value => {
    return { type: SAVE_PRODUCT_LIST, data: value }
}
