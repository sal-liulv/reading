import React from 'react'
import {NavLink} from 'react-router-dom'
import './tab.scss'

const tabsData = [
  {id: 1, title: '发现', icon: 'iconfont icon-faxian', path: '/find'},
  {id: 2, title: '书架', icon: 'iconfont icon-shujia', path: '/books'},
  // {id: 3, title: '故事', icon: 'iconfont icon-story', path: '/story'},
  {id: 3, title: '我的', icon: 'iconfont icon-mine', path: '/mine'},
]
export default ()=>{
  return (
    <nav className="app-tabs">
    {
      tabsData.map(item=>(
        <NavLink className="tab border-top" key={item.id} to={item.path}>
          <span className={item.icon}></span>
          <span className="text">{item.title}</span>
        </NavLink>
      ))
    }
    </nav>
  )
}

