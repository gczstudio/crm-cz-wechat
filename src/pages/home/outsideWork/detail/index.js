import Taro, { Component } from '@tarojs/taro'
import { View, Map } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem } from 'taro-ui'

import './index.scss'

@connect(({detail}) => ({
  ...detail,
}))
export default class Detail extends Component {
  config = {
    navigationBarTitleText: '签到详情',
  }

  constructor () {
    super(...arguments)
    this.state = {
      latitude: 23.099994,
      longitude: 113.324520,
      address: '',
      formatAddress: ''
    }

  }

  componentDidMount = () => {

  }

  render() {
    const { latitude, longitude, address, formatAddress } = this.state
    return (
      <View className='detail-page'>
        <Map
          latitude={latitude}
          longitude={longitude}
          show-location
        ></Map>
        <AtList>
          <AtListItem title='签到人员' extraText='周小明' />
          <AtListItem title='签到时间' extraText='2019-08-23 22:31' />
          <AtListItem title='签到地址' extraText='长治市东大区234号' />
          <AtListItem title='关联事项' extraText='客户：张丽丽（CZ0909）' />
          <AtListItem title='签到类型' extraText='外勤签到' />
          <AtListItem title='备注信息' />
          <View className='mark'>
            饭店烧烤发送到就放到数据发送到风刀霜剑
          </View>
        </AtList>
      </View>
    )
  }
}
