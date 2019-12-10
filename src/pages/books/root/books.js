import React, { Component } from 'react'
import Header from '../../../components/Header/Header'
import Scroll from '../../../components/rowScroll/rowScroll'
import Item from './children/item/item'
import {requestDeleteMany,getIsBooks} from '../../../store/reducers/like'
import {connect} from 'react-redux'
import './books.scss'

class books extends Component {
  constructor(props){
    super(props);
    this.state = {
      iconShow: false,//编辑/删除的切换
      books: [],//要发送给后台删除的图书
      bookNum: 0,//选择图书的数量
      allShow: false,//全选图标的出现
      allActive: '全选'
    }
  }

  render() {
    return (
      <div className="page" id="books" onClick={this.stopEvent.bind(this)}>
        <Header className="books-header" name='书架'>
          {
            this.state.iconShow ? <span className="edit-delete" onClick={this.deleteAction.bind(this)}>删除 <em>({this.state.bookNum})</em></span> :
            <span className="edit-delete" onClick={this.editAction.bind(this)}>编辑</span>
          }
          {
            this.state.allShow && <span className="all-select all-active" onClick={this.allAction.bind(this)}>{this.state.allActive}</span>
          }
        </Header>
        <div className="search"><span className="iconfont icon-search"></span><input type="text" placeholder="搜索"/></div>
        { 
          this.props.isLogin ?
          <Scroll isClick={true} className="books-scroll">
            <div className="con">
              {
                this.props.booksItemData.map(item=>(
                  <Item className="book_item icon-show" iconShow={this.state.iconShow} books={this.state.books} key={item.bookId} {...item}
                  onSelect={this.selectAction.bind(this)}
                  onClick={this.stopEvent.bind(this)}
                  />
                ))
              }
            </div>
          </Scroll> :
          <div className="go-login" onClick={this.goLogin.bind(this)}>请先登陆</div>
        }
      </div>
    )
  }
  editAction(e){//编辑
    e.stopPropagation()
    this.setState({
      ...this.state,
      iconShow: true,
      allShow: true
    })
  }
  deleteAction(e){//删除
    e.stopPropagation()
    let data = this.state.books
    if (data.length) {
      this.props.deleteMany(data)
    }
    this.setState({
      ...this.state,
      iconShow: false,
      books: [],
      allShow: false,
      allActive: '全选'
    })
  }
  allAction(e){//全选
    e.stopPropagation()
    this.state.allActive === '全选' ? 
    this.setState({
      ...this.state,
      allActive: '取消全选',
      books: this.props.bookIds,
    }) 
    : 
    this.setState({
      ...this.state,
      allActive: '全选',
      books: []
    })
  }
  selectAction(...res){//选择图书的事件
    let bookId = parseInt(res[0]);
    let iconActive = res[1];
    if (! iconActive) {
      this.setState({//编辑添加
        ...this.setState,
        books:[
          ...this.state.books,
          bookId
        ]
      })
    }
    else{
      this.setState({//编辑删除
        ...this.setState,
        books: this.state.books.filter(item=>{
          return item !== bookId
        })
      })
    }
  }
  goLogin(){//去登陆
    this.props.history.push('/mine/login')
  }
  stopEvent(e){//点击空白处取消删除
    e.stopPropagation()
    this.setState({
      ...this.state,
      iconShow: false,
      books: [],
      allShow: false,
      allActive: '全选'
    })
  }
  static getDerivedStateFromProps(props,state){
    return {
      ...state,
      bookNum: state.books.length,
      allActive: state.books.length === props.bookIds.length ? '取消全选' : '全选',
    }
  }
}

const mapStateToProps = (state)=>{
  return {
    booksItemData: state.like.likeList,
    isLogin: state.user.isLogin,
    bookIds: getIsBooks(state),
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    deleteMany(books){
      let action = requestDeleteMany(books)
      dispatch(action)
    }

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(books);