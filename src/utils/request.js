import Taro from '@tarojs/taro'
import { baseUrl, noConsole } from '../config'


export default (options = { method: 'GET', data: {} }) => {
  if (!noConsole) {
    console.log(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        options.data
      )}`
    )
  }
  return Taro.request({
    url: baseUrl + options.url,
    data: {
      ...options.data,
    },
    header: {
      'Content-Type': 'application/json',
      'Cookie': Taro.getStorageSync('Cookie')
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const { header, statusCode, data } = res
    if(header['Set-Cookie']){
      Taro.setStorageSync('Cookie', header['Set-Cookie'].split(';')[0])
    }

    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          res.data
        )
      }
      if (data.code != 0) {
        Taro.showToast({
          title: data.msg,
          icon: 'none',
          mask: true,
        })
      }
      return data
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`)
    }
  })

}
