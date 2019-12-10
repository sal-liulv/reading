import http from '../../utils/http'
import api from '../../utils/api'
import 'whatwg-fetch'


const initialState = {
  categoryBooks:[],
  topBooks:[],
  booksItemData:[]
}

// 同步action 
// 首页数据的保存
export const setCategoryBooks = (val)=>({
  type: 'setCategoryBooks',
  value: val
})
export const setTopBooks = (val)=>({
  type: 'setTopBooks',
  value: val
})
// 详情数据的保存
export const setBooksItemData = (val)=>({
  type: 'setBooksItemData',
  value: val
})

//异步action
// 请求首页的数据
export const requestBooksData = (id)=>async (dispatch)=>{
  let data = await http.get(api.FIND_LIST);
  let {homeStoreModule} = await data.json()
  let data1 = homeStoreModule.categories;
  let data2 = homeStoreModule.topCategories;
  let action1 = setCategoryBooks(data1);
  let action2 = setTopBooks(data2);
  dispatch(action1);
  dispatch(action2);
}
export const requestBooksItemData = (data)=>async (dispatch)=>{
  let action = setBooksItemData(data);
  dispatch(action);
}



export default (state = initialState, action)=>{
  switch (action.type) {
    case 'setCategoryBooks':
      return {
        ...state,
        categoryBooks: action.value
      }
    case 'setTopBooks':
      return {
        ...state,
        topBooks: action.value
      }
    case 'setBooksItemData':
      return {
        ...state,
        booksItemData: action.value
      }

    default:
      return state;
  }
}
