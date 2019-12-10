import React, { Component } from 'react'
import Scroll from '../../../components/rowScroll/rowScroll'
import {connect} from 'react-redux'
import {requestLoginOut} from '../../../store/reducers/user'
import {requestLikeList} from '../../../store/reducers/like'
import './mine.scss'

class mine extends Component {
  render() {
    let {isLogin,username} = this.props
    return (
      <div className="page"id="mine">
        <Scroll isClick={true} className="mine-scroll">
          <div className="header">
            <div className="img"><img src="" alt=""/></div>
            {isLogin && <p>{username}</p> || <p onClick={this.goLogin.bind(this)}>创建新用户></p>}
          </div>
          <div className="con" >
            <p><span className="iconfont icon-zhanghu"></span><span>账户</span><span>已购0本书</span></p>
            <p><span className="iconfont icon-qiabao"></span><span>无限卡</span><span>免费领取17天</span></p>
          </div>
          <div className="con">
            <p><span className="iconfont icon-paihangbang"></span><span>读书排行榜</span><span>第1名</span></p>
            <p><span className="iconfont icon-guanzhu"></span><span>关注</span><span>1人关注我</span></p>
          </div>
          <div className="con last">
            <p><span className="iconfont icon-shenhebijijishibenxiezi"></span><span>阅读记录</span><span>3本</span></p>
            <p><span className="iconfont icon-iconfonticonkongdiaoguishihui"></span><span>笔记</span><span>1本</span></p>
            <p><span className="iconfont icon-books"></span><span>书单</span><span>1个</span></p>
          </div>
         {isLogin && <div className="login-out" onClick={this.loginOutAction.bind(this)}>退出登陆</div>} 
        </Scroll>
      </div>
    )
  }

  goLogin(){
    this.props.history.push('/mine/login')
  }
  loginOutAction(){
    this.props.getLoginOut()
    // this.props.findBooks()
  }
}

const mapStateToProps = (state)=>{
  return {
    isLogin: state.user.isLogin,
    username: state.user.username,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    getLoginOut(){
      let action = requestLoginOut()
      dispatch(action)
    },
    findBooks(){//退出登陆之后更新书架
      let action = requestLikeList()
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(mine);
