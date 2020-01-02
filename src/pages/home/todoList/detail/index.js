import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import { formatDate } from '@/utils/index'
import { remindType } from '@/utils/enum'
import Header from '@/components/header'

import './index.scss'

@connect(({todoList}) => ({
  ...todoList,
}))
export default class Detail extends Component {

  render() {
    const { currentDetail } = this.props
    return (
      <View className='detail-page'>
        <Header title={remindType[currentDetail.remindType]} showLeft></Header>
        <View className='detail-content'>
          <View className='title'>{currentDetail.remindName}</View>
          <View className='time'><AtIcon value='clock' size='15'></AtIcon><Text style='vertical-align: middle;margin-left: 5px;'>{formatDate(currentDetail.pushTime)}</Text></View>
          <View className='content'>{currentDetail.content}</View>
        </View>
      </View>
    )
  }
}
