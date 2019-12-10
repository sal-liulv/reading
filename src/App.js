import React, { Component, lazy, Suspense } from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {CacheRoute, CacheSwitch} from 'react-router-cache-route'
import {connect} from 'react-redux'
import {requestUserStatus} from './store/reducers/user'
import {requestLikeList} from './store/reducers/like'
import Loading from './components/Loading/Loading'
import Tabs from './components/tabs/tab'

const Find = lazy(()=>import('./pages/find/root/find'));
const Books = lazy(()=>import('./pages/books/root/books'));
const Story = lazy(()=>import('./pages/story/root/story'));
const Mine = lazy(()=>import('./pages/mine/root/mine'));
const Login = lazy(()=>import('./pages/mine/login/login'));
const NotFind = lazy(()=>import('./pages/common/not-find/not-find'));
const Detail = lazy(()=>import('./pages/find/detail/detail'));
const Search = lazy(()=>import('./pages/common/search/search'));
class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<Loading/>}>
            {/* 根页面 */}
            <CacheSwitch>
              <CacheRoute path="/" exact render={()=>{
                return <Redirect to="/find"/>
              }}/>
              <CacheRoute path="/find" component={Find}/>
              <CacheRoute path="/books" component={Books}/>
              <CacheRoute path="/story" component={Story}/>
              <CacheRoute path="/mine" component={Mine}/>
              {/* 公共页面 */}
              <Route component={NotFind}/>
            </CacheSwitch>
            {/* 子页面 */}
            <>
              <Route path="/find/search" component={Search}/> */}
              <Route path="/find/detail/:booksId" component={Detail}/>
              <Route path="/mine/login" component={Login}/>
            </>
            <Tabs/>
        </Suspense>
      </Router>
    )
  }
  componentDidMount(){
    this.props.getLoginStatus()//初始用户的信息
    this.props.getBookList()//初始化书架数据
  }
}

const mapStateToProps = (state)=>{
  return {
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    getLoginStatus(){
      let action = requestUserStatus()
      dispatch(action)
    },
    getBookList(){
      let action = requestLikeList()
      dispatch(action)
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

