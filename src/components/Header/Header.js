import React, { Component } from 'react'
import './header.scss'

export default class Header extends Component {
  render() {
    return (
      <header className={`app-header ${this.props.className}`}>
        {this.props.hasBack &&  <span className=" back iconfont icon-fanhui" onClick={this.handelBack.bind(this)}></span>}
        <h1 className="title">{this.props.name}</h1>
        {this.props.children}
      </header>
    )
  }
  handelBack(){
    this.props.router.goBack()
  }
}
