import Taro, { Component } from '@tarojs/taro'
import { View, Map } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import QQMapWX from '@/utils/qqmap-wx-jssdk'
import { mapKey } from '@/config/index'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'

import './index.scss'

@connect(({signIn}) => ({
  ...signIn,
}))
export default class Signin extends Component {
  config = {
    navigationBarTitleText: 'signIn',
  }

  constructor () {
    super(...arguments)
    this.state = {
      latitude: '',
      longitude: '',
      address: '',
      formatAddress: '',
      isOpened: false
    }

    this.qqmapsdk = null

  }

  componentWillMount(){
    this.qqmapsdk = new QQMapWX({
      key: mapKey
    });
    this.getLocation()
  }

  getLocation = () => {
    Taro.getLocation({
      type: 'gcj02',
      success: (res) => {
        const { latitude, longitude } = res
        this.setState({
          latitude,
          longitude
        })
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: (data) => {
            const { address, formatted_addresses} = data.result
            this.setState({
              address,
              formatAddress: formatted_addresses.recommend
            })
          },
          fail: (error) => {
            console.error(error);
          },
          complete: (data) => {
            console.log(data);
          }
        })
      }
    })
  }

  showSignTypeModal = () => {
    this.setState({
      isOpened: true
    })
  }

  goSureSign = value => {
    this.setState({
      isOpened: false
    })
    Taro.navigateTo({
      url: `/pages/home/outsideWork/sureSign/index?type=${value}`
    })
  }

  render() {
    const { latitude, longitude, address, formatAddress, isOpened } = this.state
    return ( 
      <View className='signIn-page'>
        <Map
          latitude={latitude}
          longitude={longitude}
          show-location
        ></Map>
        {
          formatAddress ? 
          <View className='position'>
            <View className='place-name'>{formatAddress}</View>
            <View className='street-name'>{address}</View>
            <View className='correct-btn'>纠正位置</View>
          </View> : ''
        }
        <View className='punch-block' onClick={this.showSignTypeModal}>
          <View className='block-content'>
            <View className='text'>外勤签到</View>
            <View className='time'>12:00:01</View>
          </View>
        </View>
        <AtActionSheet isOpened={isOpened} cancelText='取消'>
          <AtActionSheetItem onClick={()=>this.goSureSign(1)}>
            拜访签到
          </AtActionSheetItem>
          <AtActionSheetItem onClick={()=>this.goSureSign(2)}>
            跟进签到
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}
