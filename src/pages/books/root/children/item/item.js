import React, { Component } from 'react'
import './item.scss'

export default class item extends Component {
  constructor(props){
    super(props);
    this.state = {
      iconActive: false,
      iconTag: false
    }
  }
  render() {
    let {name,img,iconShow,bookId} = this.props
    return (
      <div className={`books-item ${this.props.className}`} onClick={this.handelSelect.bind(this,bookId)}>
        <div className="img">
          <img src={img} alt=""/>
          {
            iconShow && <span className={`select_icon iconfont icon-gouxuanzhong icon-show ${this.state.iconActive && 'icon-active'}`}></span>
          }
        </div>
        <p>{name}</p>
      </div>
    )
  }
  handelSelect(bookId,e){
    e.stopPropagation()
    this.props.onSelect(bookId,this.state.iconActive)
  }
  static getDerivedStateFromProps(props,state){
    if (! props.iconShow) {//没有编辑的时候
      return {
        ...state,
        iconActive: false
      }
    }else{//编辑的时候
      return {
        ...state,
        iconActive: props.books.indexOf(parseInt(props.bookId)) === -1 ? false : true
      }
    }
  }
}
