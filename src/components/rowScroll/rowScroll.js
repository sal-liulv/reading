import React, { Component } from 'react'
import BScroll from 'better-scroll'
import './rowScroll.scss'

export default class rowScroll extends Component {
  render() {
    return (
      <div className={`row-scroll ${this.props.className}`} ref = {(scroll)=>{this.scroll = scroll}}>
        <div className="scoll-wrap">
          {this.props.children}
        </div>
      </div>
    )
  }

  componentDidMount(){
    let _this = this;
    let myScroll = new BScroll(this.scroll,{
      tap: true,
      click: _this.props.isClick,
      scrollX:true,
    })
    myScroll.on('beforeScrollStart', function(){
      // 识别当前可以滚动的最新高度
      myScroll.refresh();
    })
    // myScroll.on('scroll', (e) => {
    //   _this.props.onScroll(e)
    // });
  }
}
