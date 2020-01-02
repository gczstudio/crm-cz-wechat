import Taro, { Component } from '@tarojs/taro'
import { View, Radio, Label, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSearchBar, AtButton } from 'taro-ui'
import PropTypes from 'prop-types'
import Pagination from '@/components/pagination'
import { remindStatusEnum } from '@/utils/enum'
import moment from 'moment'
import './index.scss'

@connect(({relationSchedule}) => ({
  ...relationSchedule,
}))
export default class RelationSchedule extends Component {

  static propTypes  = {
    defaultValue: PropTypes.object,
    onSure:PropTypes.func,
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      scheduleLists: {
        content: []
      },
      schedule: {
        names: [],
        ids: []
      }
    }

    this.schedulePage = {
      page: 1,
      size: 10
    }
  }


  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillReceiveProps({defaultValue, scheduleList}){
    let copyScheduleList = scheduleList
    if(this.schedulePage.page !== 1){
      copyScheduleList = JSON.parse(JSON.stringify(this.state.scheduleLists))
      copyScheduleList.content = copyScheduleList.content.concat(scheduleList.content)
    }
    this.setState({
      scheduleLists: copyScheduleList,
      schedule: defaultValue
    })
  }


  onChangeHandler = value => {
    this.setState({
      value
    })
  }

  onActionClickHandler = () => {
    this.schedulePage.page = 1
    this.getScheduleList()
  }

  //获取日程列表
  getScheduleList = () => {
    this.props.dispatch({
      type: 'relationSchedule/allSchedule',
      data: {
        page: this.schedulePage,
        query: {
          title: this.state.value
        }
      }
    })
  }

  //客户上拉加载更多
  schedulePullHandler = () => {
    this.schedulePage.page++
    this.getScheduleList()
  }

  selectScheduleHandler = (data) => {
    const { id, title } = data
    let a = JSON.parse(JSON.stringify(this.state.schedule))
    if(a.ids.includes(id)){
      let i = a.ids.indexOf(id)
      a.ids.splice(i,1)
      a.names.splice(i,1)
    }else{
      a.ids.push(id)
      a.names.push(title)
    }
    this.setState({
      schedule: a
    })
  }

  onSureHandler = () => {
    this.props.onSure&&this.props.onSure(this.state.schedule)
  }

  render() {
    const { scheduleLists, schedule } = this.state
    return (
      <View className='relationSchedule-page'>
        <View className='search-box'>
          <AtSearchBar
            value={this.state.value}
            onChange={this.onChangeHandler}
            onActionClick={this.onActionClickHandler}
            placeholder='日程名称'
          />
        </View>
        <View className='list'>
          <Pagination totalCount={scheduleLists.total} currentLen={scheduleLists.content.length} onPull={this.schedulePullHandler}>
            { 
              scheduleLists.content.map(item=>{
                return (
                  <Label onClick={()=>{this.selectScheduleHandler(item)}} key={item.id}>
                    <View className='list-item'>
                      <View className='item-l'>
                        <View className='title'>{item.title} <Text className='tag'>{remindStatusEnum[item.remindStatus]}</Text></View>
                        <View>创建人：{item.createdName}</View>
                        <View>日程时间：{moment(item.startDate).format('YYYY-MM-DD HH:mm')} {moment(item.endDate).format('YYYY-MM-DD HH:mm')}</View>
                      </View>
                      <View className='item-r'>
                        <Radio color='#e83820' checked={schedule.ids.includes(item.id)}></Radio>
                      </View>
                    </View>
                  </Label>
                )
              })
            }
          </Pagination> 
        </View>
        <View className='sure'>
          <AtButton type='primary' onClick={this.onSureHandler}>确定</AtButton>
        </View>
      </View>
    )
  }
}
