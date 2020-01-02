import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import dva from './utils/dva'
import models from './models'

import './styles/base.scss'
import './styles/custom-variables.scss'
import './styles/iconfont/iconfont.css'

import Home from './pages/home'

import './app.scss'

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore()

class App extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    pages: [
      'pages/login/index',
      'pages/login/confirmRole/index',
      'pages/home/index',
      'pages/home/todoList/detail/index',
      'pages/home/scheduleManage/index',
      'pages/home/scheduleManage/createSchedule/index',
      'pages/home/businessManage/index',
      'pages/home/businessManage/detail/index',
      'pages/home/businessManage/follow/index',
      'pages/home/announcement/index',
      'pages/home/announcement/detail/index',
      'pages/home/outsideWork/index',
      'pages/home/outsideWork/sureSign/index',
      'pages/home/outsideWork/detail/index',
      'pages/home/businessManage/create/index',
      'pages/customer/index',
      'pages/customer/detail/index',
      'pages/customer/follow/index',
      'pages/potentialCustomer/index',
      'pages/message/index',
      'pages/mine/index'
     
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      "navigationStyle": "custom"
    },
    tabBar: {
      color: '#BCC7D6',
      selectedColor: '#e83820',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: './images/home-icon.png',
          selectedIconPath: './images/home-selected-icon.png'
        },
        {
          pagePath: 'pages/customer/index',
          text: '客户',
          iconPath: './images/customer-icon.png',
          selectedIconPath: './images/customer-selected-icon.png'
        },
        {
          pagePath: 'pages/potentialCustomer/index',
          text: '潜客',
          iconPath: './images/potential-icon.png',
          selectedIconPath: './images/potential-selected-icon.png'
        },
        {
          pagePath: 'pages/message/index',
          text: '消息',
          iconPath: './images/message-icon.png',
          selectedIconPath: './images/message-selected-icon.png'
        },
        {
          pagePath: 'pages/mine/index',
          text: '我的',
          iconPath: './images/mine-icon.png',
          selectedIconPath: './images/mine-selected-icon.png'
        }
      ]
    },
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示" 
      }
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
