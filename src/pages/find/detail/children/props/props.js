import React, { Component } from 'react'
import './prop.scss'

export default class props extends Component {
  render() {
    return (
      <div className="detail_props page modal-page">
        <div className="mask" onClick={()=>{
          this.props.showActive(false)
        }}>
          <div className="center-val" onClick={(ev)=>{
            ev.stopPropagation()
          }}>
            <span className="iconfont icon-cha-" onClick={()=>{
              this.props.showActive(false)
            }}></span>
            <p>简介</p>
            <p>{this.props.txt}</p>
          </div>
        </div>
      </div>
    )
  }
}
