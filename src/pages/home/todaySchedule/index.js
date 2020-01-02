import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtCalendar, AtIcon  } from 'taro-ui'
import { scheduleTypeEasyEnum, remindStatusEnum } from '@/utils/enum'
import noData from '@/images/no-data.png'

import moment from 'moment'

import './index.scss'

const todayStr = moment().format('YYYY-MM-DD')

@connect(({todaySchedule}) => ({
  ...todaySchedule,
}))
export default class Todayschedule extends Component {


  constructor () {
    super(...arguments)
    this.state = {
      today: todayStr,
    }
  }


  componentDidMount(){
    this.props.onRef(this)
  }

  getData = () => {
    this.getCurrentSchedule(todayStr)
    this.getAllSchedule()
  }

  getCurrentSchedule = (date) => {
    let dateArr = date.split('-');
    this.props.dispatch({
      type: 'todaySchedule/myDaySchedule',
      data:{
        year: dateArr[0],
        month: dateArr[1],
        day: dateArr[2],
      }
    })
  }

  onMonthChangeHandler = (value) => {
    this.getAllSchedule(value)
  }

  getAllSchedule = (value) => {
    
    const startDate = moment(value||new Date()).subtract(1,'months').format('YYYY-MM-DD')
    const endDate =  moment(value||new Date()).add(1,'months').format('YYYY-MM-DD')
    this.props.dispatch({
      type: 'todaySchedule/allSchedule',
      data:{
        "page": {
          page: 1,
          size: 10000
        },
        query: {
          startDate,
          endDate
        }
      }
    })
  }

  onSelectDateHandler = (date) => {
    this.setState({
      today: date.value.start
    })
    this.getCurrentSchedule(date.value.start)
  }

  goBackToday = () => {
    this.setState({
      today: todayStr
    })
    this.getCurrentSchedule(todayStr)
  }

  formatCurrentDate = (date) => {
    let arr = date.split('-')
    return `${arr[0]}年${arr[1]}月${arr[2]}日`
  }

  getMarks = (data) => {
     let arr = []
    data.forEach(item=>{
      if(!arr.includes(item.startDate)){
        arr.push(item.startDate)
      }
    })
    return arr.map(item=>{
      return {
        value: item
      }
    })
  }

  goScheduleHandler = () => {
    Taro.navigateTo({
      url: '/pages/home/scheduleManage/index'
    })
  }

  render() {
    const { today } = this.state
    const { scheduleList, allSchedule } = this.props
    return (
      <View className='todaySchedule-page'>
        <View className='date-search'>
          <View className='date-header'>
            <View className='today'>{this.formatCurrentDate(today)} {today !== todayStr ? <Text className='back-today' onClick={this.goBackToday}>回到今天</Text> : ''}</View>
            <View className='more fr' onClick={this.goScheduleHandler}><Text className='more-text'>更多</Text><AtIcon value='chevron-right' size='15' color='#6D7385'></AtIcon></View>
          </View>
          <AtCalendar currentDate={today} marks={this.getMarks(allSchedule.content)} isSwiper={false}  hideArrow onSelectDate={this.onSelectDateHandler} onMonthChange={this.onMonthChangeHandler} />
        </View>
        
        <View className='lists'>
          {
            scheduleList.map(item=>{
              return (
                <View className={'list-item '+item.scheduleType.toLowerCase()} key={item.id}>
                  <View className='item-content'>
                    <View><Text className='tag'>{scheduleTypeEasyEnum[item.scheduleType]}</Text><Text className='time'>{item.startDate?moment(item.startDate).format('MM-DD HH:mm'):''}- {item.endDate?moment(item.endDate).format('MM-DD HH:mm'):''}</Text></View>
                    <View>{item.title}</View>
                    <View className='remindStatus'>{remindStatusEnum[item.remindStatus]}</View>
                  </View>
                </View>
              )
            })
          }
        </View>
        {
          scheduleList.length == 0 ?
          <View className='no-data'>
              <Image src={noData} className='no-data-bg'></Image>
              <View>暂无日程提醒</View>
          </View> : ''
        }
        
      </View>
    )
  }
}
