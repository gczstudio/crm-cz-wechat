import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Header from '@/components/header'
import { AtSearchBar, AtGrid, AtTabs, AtTabsPane } from 'taro-ui'
import annIcon from '@/images/ann-icon.png'
import busIcon from '@/images/bus-icon.png'
import createBusIcon from '@/images/create-bus-icon.png'
import createScheIcon from '@/images/create-sche-icon.png'
import outworkIcon from '@/images/outwork-icon.png'
import scheduleIcon from '@/images/schedule-icon.png'
import TodoList from './todoList'
import TodaySchedule from './todaySchedule'
import BusinessFollow from './businessFollow'



import './index.scss'

@connect(({home}) => ({
  ...home,
}))
export default class Home extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      current: 0,
    }
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'home/searchSnList',
      data: {
        callback: (data)=>{
          if(data.length>0){
            Taro.setTabBarBadge({
              index: 3,
              text: String(data.length)
            })
          }  
        }
      }
    })
  }

  componentDidShow(){
    this.todoRef&&this.todoRef.getTodoList()
  }

  onChangeHandler = value => {
    this.setState({
      value
    })
  }

  onActionClickHandler = () => {
    Taro.setStorageSync('homeSearch',this.state.value)
    Taro.switchTab({
      url: '/pages/customer/index'
    })
  }

  handleClick = value => {
    this.setState({
      current: value
    })
    switch(value){
      case 0:
        this.todoRef.getTodoList()
        break
      case 1:
        this.scheduleRef.getData()
        break
      case 2:
        this.followRef.getBusinessList()
        break
    }
  }

  clickGridHandler = (item) => {
    Taro.navigateTo({
      url: item.url
    })
  }

  render() {
    const menu = [
      {
        image: scheduleIcon,
        value: '日程管理',
        url: '/pages/home/scheduleManage/index'
      },
      {
        image: busIcon,
        value: '商机管理',
        url: '/pages/home/businessManage/index'
      },
      {
        image: annIcon,
        value: '公告信息',
        url: '/pages/home/announcement/index'
      },
      {
        image: outworkIcon,
        value: '考勤打卡',
        url: '/pages/home/outsideWork/index'
      },
      {
        image: createBusIcon,
        value: '新建商机',
        url: '/pages/home/businessManage/create/index'
      },
      {
        image: createScheIcon,
        value: '新建日程',
        url: '/pages/home/scheduleManage/createSchedule/index'
      }
    ]

    const tabList = [{ title: '待办事项' }, { title: '今日日程' }, { title: '商机跟进' }]

    return (
      <View className='home-page'>
        <Header title='长治银行' color='linear-gradient(225deg,rgba(245,105,67,1) 0%,rgba(232,56,32,1) 100%)' showLeft={false} fixed />
        <View className='search-Header'>
          <AtSearchBar
            value={this.state.value}
            onChange={this.onChangeHandler}
            onActionClick={this.onActionClickHandler}
            placeholder='客户姓名/证件号/手机号'
          />        
          <View className='grid-box'>
            <AtGrid hasBorder={false} data={menu} onClick={this.clickGridHandler} />
          </View>
        </View>
        
        <AtTabs current={this.state.current} scroll tabList={tabList} onClick={this.handleClick}>
          <AtTabsPane current={this.state.current} index={0} >
            <TodoList onRef={node=>{this.todoRef=node}} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <TodaySchedule onRef={node=>{this.scheduleRef=node}} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <BusinessFollow onRef={node=>{this.followRef=node}} />
          </AtTabsPane>
        </AtTabs>

      </View>
    )
  }
}
