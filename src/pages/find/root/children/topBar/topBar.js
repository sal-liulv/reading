import React, { Component } from 'react'
import './topbar.scss'
import RowScroll from '../../../../../components/rowScroll/rowScroll'
import Item from '../item/item'

export default class topBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      list:[],
      copyList:[],
    }
  }
  render() {
    let {img,list,copyList} = this.state;
    return (
      <div className={`top-bar ${this.props.className}`}>
        <div className="title">
          <img src={img} alt=""/>
        </div>
        <RowScroll isClick={true} className="top-scroll">
          <div className="wrap">
            {
              copyList.map((item,index)=>{
                return(
                  <div className="items" key={index}>
                    <Item router={this.props.router} data={item[0]}/>
                    <Item router={this.props.router} data={item[1]}/>
                    <Item router={this.props.router} data={item[2]}/>
                  </div>
                )
              })
            }
          </div>
        </RowScroll>
        <div className="more">查看更多</div>
      </div>
    )
  }
  componentDidMount(){
    this.setState({
      ...this.state,
      img:this.props.data.ranklistCover.chart_detail_title_dark,
      list: this.props.data.lectureBooks,
      copyList: this.copyList()
    })
  }

  copyList(){
    let itemList = [...this.props.data.lectureBooks];
    let tmp = [];
    while(itemList.length > 0 && tmp.length <= 1){
      tmp = [...tmp, itemList.splice(0, 3)];
    }
    return tmp;
  }
}
