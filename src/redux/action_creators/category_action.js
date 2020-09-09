import { SAVE_CATEGORY_LIST } from '../action_types'
//用于保存商品分类的方法
export const createSaveCategoryList = value => {
    return { type: SAVE_CATEGORY_LIST, data: value }
}
