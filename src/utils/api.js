// 管理api
// export const HOST = '';

/*
首页书列表
参数：无
*/
const FIND_LIST = '/api/find/list';

/*
登录接口
post
参数：id
*/
const LOGIN_API = '/api/user/login';

/*
检查登录
参数：无
*/
const CHECK_LOGIN = '/api/user/check_login'

/*
退出登录
参数：无
*/
const LOGOUT_API = '/api/user/logout'

/* 
添加收藏
post
参数：user_id  type  city  name  prince  (pic由后台获得)
*/
const LIKE_ADD = '/api/like/add'

/* 
查找收藏列表
get
参数：无 user_id
*/
const LIKE_FIND = '/api/like/find_by_user'

/* 
取消收藏
get
参数：无 user_id
*/
const LIKE_DELETE = '/api/like/delete_by_user'

/* 
批量取消收藏
get
参数：bookId
*/
const LIKE_DELETE_MANY = 'api/like/delete_by_user_many'

/* 
大家都在搜
get
 */
const SEARCH_HOT_LIST = 'api/search/hot_list'

/* 
搜索热更新
get
参数：keyword ，count
*/
const SEARCH_HOT_TEXT = 'api/search/hot_text'

/* 
搜索的具体书籍信息
get
参数：keyword, maxIdx
*/
const SEARCH_HOT_BOOK_LIST = '/api/search/hot_book_list'

export default {
  FIND_LIST,
  LOGIN_API,
  CHECK_LOGIN,
  LOGOUT_API,
  LIKE_ADD,
  LIKE_FIND,
  LIKE_DELETE,
  LIKE_DELETE_MANY,
  SEARCH_HOT_LIST,
  SEARCH_HOT_TEXT,
  SEARCH_HOT_BOOK_LIST
}
