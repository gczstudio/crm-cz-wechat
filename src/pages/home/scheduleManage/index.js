import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtCalendar, AtFab  } from 'taro-ui'
import Header from '@/components/header'
import noData from '@/images/no-data.png'
import { scheduleTypeEasyEnum, remindStatusEnum } from '@/utils/enum'
import moment from 'moment'
import './index.scss'

@connect(({scheduleManage}) => ({
  ...scheduleManage,
}))
export default class Schedulemanage extends Component {

  constructor () {
    super(...arguments)
    this.state = {
    }
  }

  componentDidMount() {
    this.getCurrentSchedule(moment().format('YYYY-MM-DD'))
    this.getAllSchedule()
  }

  componentWillReceiveProps({allSchedule}){
    this.setState({
      marks: this.getMarks(allSchedule.content)
    })
  }

  onSelectDateHandler = (e) => {
    this.getCurrentSchedule(e.value.start)
  }

  onMonthChangeHandler = (value) => {
    this.getAllSchedule(value)
  }

  getCurrentSchedule(date){
    let dateArr = date.split('-');
    this.props.dispatch({
      type: 'scheduleManage/myDaySchedule',
      data:{
        year: dateArr[0],
        month: dateArr[1],
        day: dateArr[2],
      }
    })
  }

  getAllSchedule = (value) => {
    const startDate = moment(value||new Date()).subtract(1,'months').format('YYYY-MM-DD')
    const endDate =  moment(value||new Date()).add(1,'months').format('YYYY-MM-DD')
    this.props.dispatch({
      type: 'scheduleManage/allSchedule',
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

  getMarks = (data) => {
    let arr = []
    data.forEach(item=>{
      let d = moment(item.startDate).format('YYYY-MM-DD')
      if(!arr.includes(d)){
        arr.push(d)
      }
    })
    return arr.map(item=>{
      return {
        value: item
      }
    })
 }


  goCreateHandler = () => {
    Taro.navigateTo({
      url: '/pages/home/scheduleManage/createSchedule/index'
    })
  }

  goDetailHandler = (id) => {
    Taro.navigateTo({
      url: `/pages/home/scheduleManage/createSchedule/index?type=1&id=${id}`
    })
  }

  render() {
    const { scheduleList, allSchedule } = this.props
    return (
      <View className='scheduleManage-page'>
        <Header title='日程管理' showLeft fixed />
        <AtCalendar marks={this.getMarks(allSchedule.content)} onSelectDate={this.onSelectDateHandler} onMonthChange={this.onMonthChangeHandler} />
        <View className='lists'>
        {
          scheduleList.map(item=>{
            return (
              <View className={'list-item '+item.scheduleType.toLowerCase()} key={item.id} onClick={()=>{this.goDetailHandler(item.id)}}>
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
        <View className='create-btn'>
          <AtFab onClick={this.goCreateHandler}>
            <Text className='at-fab__icon at-icon at-icon-add'></Text>
          </AtFab>
        </View>
       
      </View>
    )
  }
}
