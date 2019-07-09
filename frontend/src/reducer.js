import {ADD_LISTS} from './actions'

export default function reducer (state = [], action) {

switch(action.type) {
  //获取数据
  case ADD_LISTS:
    return  action.data
  default :
    return state}
}


