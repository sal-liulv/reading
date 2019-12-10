import React, { Component } from 'react'
import Header from '../../../components/Header/Header'
import Props from './children/props/props'
import {requestAddLike,requestDeleteList,getIsBooks} from '../../../store/reducers/like'
import {connect} from 'react-redux'

import './detail.scss'
import find from '../root/find'

class detail extends Component {
  constructor(props){
    super(props)
    if (props.booksItemData.bookInfo ) {
      this.state = {
        img: props.booksItemData.bookInfo.cover,
        title: props.booksItemData.bookInfo.title,
        author: props.booksItemData.bookInfo.author,
        intro: props.booksItemData.bookInfo.intro,
        price: props.booksItemData.bookInfo.price,
        propsShow:false,//弹出层的显示
        isBooks: false,//是否显示添加到书架
      }
    }else{
      this.state ={}
    }
  }
  render() {
    let {img,title,author,intro,price,propsShow,isBooks} = this.state;
    return (
      <div className="page subpage" id="detail">
        <Header name={title} router={this.props.history} hasBack={true}/>
        <div className="detail-content">
          <div className="img">
            <img src={img} alt=""/>
          </div>
          <div className="value">
            <div className="name">{title}</div>
            <div className="author">{author}</div>
            <div className="text "><p className="more-overflow" ref={(p)=>this.moreText = p}>{intro}</p> <span onClick={this.handelActive.bind(this,true)}>更多</span></div>
            <div className="icon">
              <p><span className="iconfont icon-che"></span><span>{price}</span></p>
              <p><span className="iconfont icon-sanheng"></span><span>目录</span></p>
            </div>
          </div>
        </div>
        <div className="detail-tab border-top">
          <span>听书</span>
          <span>阅读</span>
          {
            this.props.isLogin ? <span className="books-btn" onClick={this.joinAction.bind(this)}>{isBooks ? '移出书架' : '加入书架' }</span>
            : <span className="books-btn" onClick={this.goLogin.bind(this)}>登陆加入书架</span>
          }
          
        </div>
         {propsShow && <Props txt={intro} showActive={this.handelActive.bind(this)}/>}
      </div>
    )
  }
  handelActive(e){//控制遮罩层的显示
    this.setState({
      ...this.state,
      propsShow:e
    })
  }
  joinAction(){
    if (this.state.isBooks) {//取消收藏
      this.props.success ? this.props.delete(this.props.match.params.booksId) : window.mui.toast('您操作太快');//节流
    }
    else{//收藏
      if (this.props.success) {//节流
        let res = {};
        res.bookId = this.props.match.params.booksId;
        res.name = this.state.title;
        res.author = this.state.author
        res.img = this.state.img
        this.props.add(res)
      }
      else{
        window.mui.toast('您操作太快')
      }
    }
  }
  goLogin(){
    this.props.history.push('/mine/login')
  }

  static getDerivedStateFromProps(props,state){
    let bookId = parseInt(props.match.params.booksId)
    if (props.isBooks.indexOf(bookId) !== -1) {
      return {
        ...state,
        isBooks: true,
      }
    }
    else{
      return {
        ...state,
        isBooks: false,
      }
    }
  }
}

const mapStateToProps = (state)=>{
  return {
    booksItemData: state.find.booksItemData,
    isLogin: state.user.isLogin,
    isBooks:getIsBooks(state),
    success: state.like.success
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    add(res){
      let action = requestAddLike(res)
      dispatch(action)
    },
    delete(bookId){
      let action = requestDeleteList(bookId)
      dispatch(action)
    },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(detail);
