import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import Header from '@/components/header'

import './index.scss'

@connect(({confirmRole, login}) => ({
  ...confirmRole, ...login
}))
export default class Confirmrole extends Component {

  confirmRoleHandler = (data) => {
    Taro.setStorageSync('userInfo',data)
    this.props.dispatch({
      type: 'confirmRole/confirmIdentity',
      data: {
        data: {
          identityId: data.id
        },
        callback: () => {
          Taro.switchTab({
            url: '/pages/home/index'
          })
        }
        
      }
    })
  }

  render() {
    const { roleData } = this.props
    return (
      <View className='confirmRole-page'>
        <Header title='选择角色' showLeft />
        <View className='confirmRole-content'>
          {
            roleData.identity.map(item=>{
              return (<View className='role' key={item.id} onClick={()=>{this.confirmRoleHandler(item)}}>
                <AtIcon prefixClass='fa' value='iconavatar' size='30' color='#ccc'></AtIcon><Text className='role-text'>{item.name}</Text>
              </View>)
            })
          }
        </View>
      </View>
    )
  }
}
