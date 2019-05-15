import TyFetch from './TyFetch'
import APIList from '../../api/list'

const TyAPI = {
  config: {},
  configs: APIList,
  use(name = 'default') {
    this.config = this.configs[name]
    return this
  },
  parse(path = '') {
    let target = this.config
    path.replace(/(.)json/g, '').split('/').forEach(p => {
      target = target[p]
    })
    return this.config.baseURL + '/' + target
  },
  fetch(path = '', method = 'GET', {data = {}, debug = false} = {}) {
    return TyFetch
        .fetch(this.parse(path), method, {data, cookies: true, debug})
        .catch(e => {
          // 检查是否登录
          if (e.response.status === 401) {
            // 未登录
            return e.response.json()
          } else {
            // 已登录但是遇到其他错误，抛出到下一个 catch
            throw e
          }
        })
        .then(json => {
            console.log(json);
          if (json && json.data && typeof json.data === "string" && json.data.startsWith('http://lg.haimaiche.com')) {
            // 未登录做跳转
              location.href = "http://lg.haimaiche.com/login.htm?appid=281454884644130816"
          } else {
            // 已登录将数据传到下一个 then
            return json
          }
        })
        .catch(e => {
            console.log("fetch error!");
          console.error([
            '[TyAPI][' + method.toUpperCase() + '][' + this.parse(path) + ']:',
            '',
            '1. 检查是否正在请求不被允许的跨域资源',
            '2. 检查返回值类型是否为正确的 JSON 字符串',
            '3. 检查是否正确配置了服务器地址',
            '4. 检查是否已登录讴歌'
          ].join('\n'))
          console.error('发送到服务器的数据：', data)
          console.error(e)
          return {
            success: false,
            data: {},
            message: '请求错误，请查看控制台'
          }
        })
  },
  get(path = '', data = {}) {
      // return this.fetch(path, 'get', {data})
      return TyFetch.get(this.parse(path), {data, cookies: true, debug: false})
          .catch(e => {
              // 检查是否登录
              if (e.response.status === 401) {
                  // 未登录
                  return e.response.json();
              }
              console.log("get error!");
              console.error([
                  '[TyAPI][POST][' + this.parse(path) + ']:',
                  '',
                  '1. 检查是否正在请求不被允许的跨域资源',
                  '2. 检查返回值类型是否为正确的 JSON 字符串',
                  '3. 检查是否正确配置了服务器地址'
              ].join('\n'))
              console.error('发送到服务器的数据：', data)
              console.error(e)
              return {
                  success: false,
                  data: {},
                  message: '请求错误，请查看控制台'
              }
          })
          .then(json => {
              if (json && json.data && typeof json.data === "string" && json.data.startsWith('http://lg.haimaiche.com')) {
                  // 未登录做跳转
                  location.href = "http://lg.haimaiche.com/login.htm?appid=281454884644130816"
              } else {
                  // 已登录将数据传到下一个 then
                  return json
              }
          })

  },

  post(path = '', data = {}) {
      // return this.fetch(path, 'post', {data})
      return TyFetch.post(this.parse(path), {data, reqtype: 'json', cookies: true, debug: false})
          .catch(e => {
              // 检查是否登录
              if (e.response.status === 401) {
                  // 未登录
                  return e.response.json();
              }
              console.log("post error!");
              console.error([
                  '[TyAPI][POST][' + this.parse(path) + ']:',
                  '',
                  '1. 检查是否正在请求不被允许的跨域资源',
                  '2. 检查返回值类型是否为正确的 JSON 字符串',
                  '3. 检查是否正确配置了服务器地址'
              ].join('\n'))
              console.error('发送到服务器的数据：', data);
              console.error(e)
              return {
                  success: false,
                  data: {},
                  message: '请求错误，请查看控制台'
              }
          })
          .then(json => {
              if (json && json.data && typeof json.data === "string" && json.data.startsWith('http://lg.haimaiche.com')) {
                  // 未登录做跳转
                  location.href = "http://lg.haimaiche.com/login.htm?appid=281454884644130816"
              } else {
                  // 已登录将数据传到下一个 then
                  return json
              }
          })

  },

  // autoSwitch(baseURL = '') {
  //   // 本地开发 mock 服务器与联调服务器自动配置
  //   if (baseURL === 'DEV/MOCK') {
  //     localStorage.setItem('baseURL', '')
  //   } else if (baseURL) {
  //     localStorage.setItem('baseURL', baseURL)
  //   }
  //   if (localStorage.getItem('baseURL')) {
  //     TyAPI.use('server').config.baseURL = localStorage.getItem('baseURL')
  //   } else {
  //     TyAPI.use('mock').config.baseURL = '/mock/lissandra/'
  //   }
  //   return this
  // }
}

TyFetch.global()

export default TyAPI.use()