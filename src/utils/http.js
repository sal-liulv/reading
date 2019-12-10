import 'whatwg-fetch'

// get请求
// window.fetch('/users.json?a=1&b=2')
// .then((response) => {
//   //得到了响应，如何处理结果
//   return response.json() //当成json对象解析

// }).then((json)=> {
//   // 解析得到的结果 是json对象
//   console.log('parsed json', json)

// }).catch((ex) =>{
//   console.log('parsing failed', ex)
// })
// .finally(()=>{
// })

// var form = document.querySelector('form')
 
// fetch('/users', {
//   method: 'POST',
//   body: new FormData(form)
// })


// fetch('/users', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Hubot',
//     login: 'hubot',
//   })
// })

export default class Http{

  static async request(method, url, data){
    //判断请求的类型
    let response = ''
    if (method === 'GET') {
      const params = this.objToString(data)
      response = await fetch(`${url}?${params}`)
    }
    else if (method === 'POST') {
      response = await fetch(`${url}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
    // 判断是否成功
    return this.isSuccess(response);
  };

  // 将对象参数转换为字符串参数
  static objToString(obj) {
    if(!obj ) {
        return "";
    } else {
        var arr = [];
        for(var key in obj) {
            arr.push(key + "=" + obj[key]);
        }
        return arr.join("&");
    }
}

  // 判断响应结果是否成功
  static isSuccess(res){
    if(res.status >= 200 && res.status < 300){
      return res;
    }else{
      this.requestExpection(res);
    }
  };

  // 构建失败对象
  static requestExpection(res){
    throw new Error(res);
  };

  // get便捷方法
  static get(url, data){
    return this.request('GET', url, data);
  };

  // post便捷方法
  static post(url, data){
    return this.request('POST', url, data);
  }
}