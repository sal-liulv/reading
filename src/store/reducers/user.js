import http from '../../utils/http'
import api from '../../utils/api'
import {requestLikeList} from './like'
import 'whatwg-fetch'

const initialState = {
  isLogin: false,
  loginMessage: '',
  username:'',
}

export const setIsLogin = (val)=>({
  type: 'setIsLogin',
  value: val
})

export const setLoginMessage = (val)=>({
  type: 'setLoginMessage',
  value: val
})

export const setUserName = (val)=>({
  type: 'setUserName',
  value: val
})

export const requestUserData = (username,password)=>async (dispatch)=>{
  let data = await http.post(api.LOGIN_API,{username,password})
  let {code,message} = await data.json();
  if (code === 0) {
    window.mui.toast(message);//提示登陆成功
    let action1 = setIsLogin(true);
    let action2 = setLoginMessage(message);
    let action3 = setUserName(username)
    dispatch(action1);
    dispatch(action2);
    dispatch(action3);
  }else if (code === -1) {
    window.mui.toast(message);//提示登陆失败
    let action1 = setIsLogin(false);
    let action2 = setLoginMessage(message);
    dispatch(action1);
    dispatch(action2);
  }
}

export const requestUserStatus = ()=>async (dispatch)=>{
  let data = await http.get(api.CHECK_LOGIN)
  let {code,message} = await data.json()
  if (code === 0) {
    let action1 = setIsLogin(true);
    let action2 = setUserName(message)//检查登陆的时候把用户名给传过来
    dispatch(action1);
    dispatch(action2);
  }
}

export const requestLoginOut = ()=>async (dispatch)=>{
  let data = await http.get(api.LOGOUT_API)
  let {code} = await data.json()
  if (code === 0) {
    window.mui.toast('退出登陆');//提示登陆失败
    let action1 = setIsLogin(false);
    let action2 = setUserName('')
    dispatch(action1);
    dispatch(action2);
  }
}

export default (state = initialState, action)=>{
  switch (action.type) {
    case 'setIsLogin':
      return {
        ...state,
        isLogin: action.value
      }
    case 'setLoginMessage':
      return {
        ...state,
        loginMessage: action.value
      }
    case 'setUserName':
      return {
        ...state,
        username: action.value
      }
    default:
      return state;
  }
}

