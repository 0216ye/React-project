import { SAVE_TITLE } from '../action_types'
//用于Login表单用户登录的方法
export const createSaveTitleAction = value => {
    return { type: SAVE_TITLE, data: value }
}
