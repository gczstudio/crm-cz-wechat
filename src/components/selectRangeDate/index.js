import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import { AtCalendar, AtMessage } from 'taro-ui'

import './index.scss'

export default class Selectrangedate extends Component {

  static propTypes  = {
    defaultValue:PropTypes.array,
    onSure: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.state = {
      start: '',
      end: ''
    }
  }

  componentWillMount(){
    if(this.props.defaultValue){
      this.setState({
        start: this.props.defaultValue[0],
        end: this.props.defaultValue[1]
      })
    }
    
  }

  selectDateHandler = (data) => {
    this.setState({
      start: data.value.start,
      end: data.value.end
    })
  }

  sureHandler = () => {
    const { start, end } = this.state
    if(!start){
      Taro.atMessage({
        'message': '请选择开始时间',
        'type': 'warning',
      })
      return
    }

    if(!end){
      Taro.atMessage({
        'message': '请选择截止时间',
        'type': 'warning',
      })
      return
    }
    this.props.onSure&&this.props.onSure({
      start,
      end
    })
  }

  clearHandler =() => {
    this.setState({
      start: '',
      end: ''
    })
  }

  render() {
    const { start, end } = this.state
    return (
      <View className='selectRangeDate-page'>
        {
          start && end ? <AtCalendar isMultiSelect onSelectDate={this.selectDateHandler} currentDate={{start,end}} /> : <AtCalendar isMultiSelect onSelectDate={this.selectDateHandler} />
        }
        <View className='clear' onClick={this.clearHandler}>清除已选</View>
        <View className='has-select'>
          <View className='date'>
            <View>开始时间：{start}</View>
            <View>截止时间：{end}</View>
          </View>
          <View className='sure-btn' onClick={this.sureHandler}>确定</View>
        </View>
        <AtMessage />
      </View>
    )
  }
}
