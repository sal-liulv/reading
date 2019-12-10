import React, { Component } from 'react'
import Header from '../../../components/Header/Header'
import {connect} from 'react-redux'
import {requestUserData} from '../../../store/reducers/user'
import {requestLikeList} from '../../../store/reducers/like'
import './login.scss'

class login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pass: '',
      show: '',
    }
  }
  render() {
    return (
      <div className="page subpage login" >
        <Header router={this.props.history} hasBack={true} name='新建用户信息'/>
        <p className="username border-bottom"><span>账号 : </span> <input type="text" onInput={this.userAction.bind(this)}/></p>
        <p className="password border-bottom"><span>密码 : </span> <input type="password" onInput={this.passAction.bind(this)}/></p>
        <div className={`save ${this.state.show}`} onClick={this.loginAction.bind(this)} >保存</div>
      </div>
    )
  }
  userAction(e){
    this.setState({
      ...this.state,
      user: e.target.value
    },()=>{
      if (this.state.user && this.state.pass){
        this.setState({
          ...this.state,
          show: 'show'
        })
      }else{
        this.setState({
          ...this.state,
          show: ''
        })
      }
    })
  }
  passAction(e){
    this.setState({
      ...this.state,
      pass: e.target.value
    },()=>{
      if (this.state.user && this.state.pass){
        this.setState({
          ...this.state,
          show: 'show'
        })
      }else{
        this.setState({
          ...this.state,
          show: ''
        })
      }
    })
  }
  loginAction(){
    let username = this.state.user;
    let password = this.state.pass;
    this.props.getUserData(username,password)
  }
  static getDerivedStateFromProps(props, state){
    if (props.isLogin) {
      props.getBooks();//登陆成功之后请求书架的数据
      props.history.goBack()//回退
    }
    return state
  }
}
const mapStateToProps = (state)=>{
  return {
    isLogin: state.user.isLogin
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    getUserData(username,password){
      let action = requestUserData(username,password);
      dispatch(action);
    },
    getBooks(){
      let action = requestLikeList()
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(login);

