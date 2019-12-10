import React, { Component } from 'react'
import IScroll from 'iscroll'
import './scroll.scss'


export default class scroll extends Component {
  render() {
    return (
      <div className={`app-scroll ${this.props.className}`} ref = {(scroll)=>{this.scroll = scroll}}>
        {this.props.children}
      </div>
    )
  }
  componentDidMount(){
    let myScroll = new IScroll(this.scroll,{
      tap: true,
      click: true,
      scrollbars: true,
      freeScroll:true,
      eventPassthrough:true,
    })
    myScroll.on('beforeScrollStart', function(){
      // 识别当前可以滚动的最新高度
      myScroll.refresh();
      console.log(myScroll);
    })
  }

}
