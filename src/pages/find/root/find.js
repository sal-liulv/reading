import React, { Component } from 'react'
import Header from '../../../components/Header/Header'
import Scroll from '../../../components/rowScroll/rowScroll'
import TopBar from './children/topBar/topBar'
import {connect} from 'react-redux'
import {requestBooksData} from '.././../../store/reducers/find'
import './find.scss'

class find extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booksData : [],
    }
  }
  render() {
    let props = this.props;
    return (
      <div className= "page" id="find">
         <Header hasBack={false} className="border-bottom find-header" name='书城'/>
         <div className="header-search">
            <span className=" iconfont icon-search "></span>
            <input className="" type="text" placeholder="半小时漫画中国史番外篇（独家首发）"/>
         </div>
         <Scroll isClick={false} className='scroll' onScroll={this.handleScroll.bind(this)}>
           <div className="find-wrap">
              <div className="find-search">
                <span className=" iconfont icon-search "></span>
                <input className="" type="text" placeholder="半小时漫画中国史番外篇（独家首发）"/>
              </div>
             <div className="banner">
               <img src="/img/banner.png" alt=""/>
             </div>
             {
               props.topBooks.map((item,index)=>{
                 return(
                  <TopBar router={props.history} data = {item} key={index}/>
                 )
               })
             }
          </div>
         </Scroll>
      </div>
    )
  }

  handleScroll(e){
    console.log(e);
  }
  initData(){
    //请求正在热映的数据
    if(this.props.topBooks.length > 0){
      //已经有数据了
      return;
    }else{
      //才开始请求
      this.props.getBooksData();
    }
  }
  componentDidMount(){
    this.initData()
  }
}

const mapStateToProps = (state)=>{
  return {
    topBooks: state.find.topBooks
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    getBooksData(){
      let action = requestBooksData();
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(find);
