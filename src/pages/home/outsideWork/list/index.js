import Taro, { Component } from '@tarojs/taro'
import { View, Text, CoverImage } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import avatar from '@/images/avatar.png'


import './index.scss'

@connect(({list}) => ({
  ...list,
}))
export default class List extends Component {
  config = {
    navigationBarTitleText: 'list',
  }

  componentDidMount = () => {

  }

  goDetailHandler = () => {
    Taro.navigateTo({
      url: '/pages/home/outsideWork/detail/index'
    })
  }

  render() {
    return (
      <View className='list-page'>
        <View className='list' onClick={this.goDetailHandler}>
          <View className='top'>
            <View className='top-l'>
              <View className='avatar'>
                <CoverImage src={avatar}></CoverImage>
              </View>
              <View className='person'>周小明<Text className='role'>客户经理</Text></View>
              <View className='time'>2019-08-23 22:31</View>
            </View>
            <View className='top-r'>工单签到</View>
          </View>
          <View className='middle'>
            <AtIcon value='map-pin' size='15'></AtIcon><Text style='vertical-align: middle'>山西省长治市罗城区东大街235号</Text>
          </View>
          <View className='bottom'>
            关联客户：张丽丽（cz00900)
          </View>
        </View>
      </View>
    )
  }
}
