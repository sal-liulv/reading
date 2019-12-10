import React, { Component } from 'react'
import {connect} from 'react-redux'
import {requestBooksItemData} from '../../../../../store/reducers/find'
import './item.scss'


class item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      img: props.data.bookInfo.cover,
      author: props.data.bookInfo.author,
      title: props.data.bookInfo.title,
      index:props.data.searchIdx,
    }
  }
  render() {
    let {img,author,title,index} = this.state;
    return (
      <div className="find-item " onClick={this.goDetail.bind(this)}>
        <div className="img"><img src={img} alt=""/></div>
        <div className="value">
          <p ><span>{index}</span> <span>{title}</span></p>
          <p>{author}</p>
        </div>
      </div>
    )
  }
  goDetail(){
    let path = {pathname:`/find/detail/${this.props.data.bookInfo.bookId}`}
    this.props.router.push(path)
    let data = this.props.data
    this.props.getBooksItemData(data)
  }
}

const mapStateToProps = (state)=>{
  return {
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    getBooksItemData(data){
      let action = requestBooksItemData(data);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(item);
