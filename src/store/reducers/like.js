import http from '../../utils/http'
import api from '../../utils/api'
import 'whatwg-fetch'

const initialState = {
  likeList: [],
  success: true,
}

export const setLIkeList = (val)=>({
  type: 'setLIkeList',
  value: val
})

export const setSuccess = (val)=>({
  type: 'setSuccess',
  value: val
})


export const requestLikeList = ()=>async (dispatch)=>{//首页查询需要用到，同时添加和删除之后需要重新用到
  let res = await http.get(api.LIKE_FIND)
  let {data} = await res.json();
  let action = setLIkeList(data)
  dispatch(action)
}

export const requestAddLike = (res)=>async (dispatch)=>{
  dispatch(setSuccess(false))//还未请求成功的时候设置false
  let data = await http.post(api.LIKE_ADD,res)
  let {code} = await data.json()
  if (code === 0) {//添加成功，重新请求书架数据
    dispatch(setSuccess(true))//请求成功的时候设置true
    window.mui.toast('加入书架');//提示登陆成功
    let action =  requestLikeList()
    dispatch(action)
  }
}

export const requestDeleteList = (bookId)=>async (dispatch)=>{
  dispatch(setSuccess(false))//还未请求成功的时候设置false
  let data = await http.get(api.LIKE_DELETE,{bookId})
  let {code} = await data.json()
  if (code === 0) {//删除成功，重新请求书架数据
    dispatch(setSuccess(true))//请求成功的时候设置true
    window.mui.toast('移出书架');//提示登陆成功
    let action =  requestLikeList()
    dispatch(action)
  }
}

export const requestDeleteMany = (books)=>async (dispatch)=>{
  let res = JSON.stringify(books)
  let data = await http.get(api.LIKE_DELETE_MANY,{bookId:res})
  let {code} = await data.json()
  if (code === 0) {
    window.mui.toast('移出书架');
    let action = requestLikeList()
    dispatch(action)
  }else{
    window.mui.toast('请重试');
  }
}

export default (state = initialState, action)=>{
  switch (action.type) {
    case 'setLIkeList':
      return {
        ...state,
        likeList: action.value
      }
    case 'setSuccess':
      return {
        ...state,
        success: action.value
      }
    default:
      return state;
  }
}

// selector
export const getIsBooks = (state)=>{
  return state.like.likeList.map(item=> parseInt(item.bookId))
}