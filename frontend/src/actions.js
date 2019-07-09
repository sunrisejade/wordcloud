export const ADD_LISTS ='ADD_LISTS';


export function addListToStore (data) {
  return {
    type: ADD_LISTS, 
    data
  }
}
