import { SAVE_USERINFO_LIST } from '../action_types'
//用于保存商品分类的方法
export const createSaveUserInfoList = value => {
    return { type: SAVE_USERINFO_LIST, data: value }
}
