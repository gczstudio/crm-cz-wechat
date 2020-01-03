import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import avatar from '@/images/avatar.png'
import { AtList, AtListItem, AtRadio, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import Header from '@/components/header'
import Layout from '@/components/layout'
import { baseUrl } from '@/config/index'

import './index.scss'

@connect(({mine, selectRole}) => ({
  ...mine, ...selectRole
}))
export default class Mine extends Component {
  
  constructor () {
    super(...arguments)
    this.state = {
      roleInfo: {
        identity: []
      },
      userInfo: '',
      roleType: '',
      isOpened: false,
      avatarUrl: ''
    }
  }

  componentDidShow(){
    let roleInfo =Taro.getStorageSync('roleInfo')
    let userInfo = Taro.getStorageSync('userInfo')
    this.setState({
      roleInfo,
      userInfo,
      roleType: String(userInfo.id)
    })   
    this.getAvatar(roleInfo)
  }

  componentDidHide(){
    this.setState({
      isOpened: false
    })
  }

  getAvatar = (roleInfo) => {
    Taro.request({
      url: `${baseUrl}/common/file/download?id=${roleInfo.headIconId}`,
      method: 'GET',
      responseType: 'arraybuffer',
      header: {
        'Content-Type': 'application/json',
        'Cookie': Taro.getStorageSync('Cookie')
      },
      success: (res) => {
        this.setState({
          avatarUrl: 'data:image/png;base64,'+Taro.arrayBufferToBase64(res.data)
        })
        
      }
    })

  }

  roleTypeHandler = () => {
    this.roleTypeRef.show()
  }

  roleTypeChangeHandler = (value) => {
    this.setState({
      roleType: String(value)
    })
    this.roleTypeRef.hide()
    Taro.setStorageSync('userInfo',this.getRoleById(value))
    this.props.dispatch({
      type: 'mine/confirmIdentity',
      data: {
        data: {
          identityId: value
        },
        callback: () => {
          Taro.showToast({
            title: '切换成功',
            icon: 'success',
            duration: 2000
          }).then(() => {
            Taro.switchTab({
              url: '/pages/home/index'
            })
          })
        }
      } 
    })
  }

  formatRole = (data) =>{
    let arr = []
    data.forEach(item=>{
      arr.push({
        label: item.name,
        value: String(item.id)
      })
    })
    return arr
  }
  

  getRoleById = (id) => {
    return this.state.roleInfo.identity.find(item=>{
      return item.id==id
    })
  }

  showLogoutHandler = () => {
    this.setState({
      isOpened: true
    })
  }

  logoutHandler = () => {
    this.setState({
      isOpened: false
    })
    this.props.dispatch({
      type: 'mine/logout',
      data: {
        callback: () => {
          Taro.showToast({
            title: '退出成功',
            icon: 'success',
            duration: 2000
          }).then(() => {
            Taro.navigateTo({
              url: '/pages/login/index'
            })
          })
        }
      } 
    })
  }

  render() {
    const { roleInfo, userInfo, roleType, isOpened, avatarUrl } = this.state
    return (
      <View className='mine-page'>
        <Header title='我的' showLeft={false} fixed />
        <View className='mine-header'>
          <View className='avatar'>
            <Image src={avatarUrl || avatar} className='icon'></Image>
          </View>
          <View className='user'>
            <View className='person'>{roleInfo.name}<Text className='role'>{userInfo.name}</Text></View>
            <View className='number'>{roleInfo.no}</View>
          </View>
        </View>
        <AtList>
          <AtListItem
            title='角色切换'
            arrow='right'
            hasBorder={false}
            iconInfo={{ size: 25, color: '#BCC7D6', value: 'star-2'}}
            extraText={roleType ? this.getRoleById(roleType).name : '点击选择'} onClick={this.roleTypeHandler}
          />
        </AtList>
        <View className='logout' onClick={this.showLogoutHandler}>安全退出</View>
        <Layout title='角色切换' ref={node=>{this.roleTypeRef = node}}>
          <AtRadio 
            options={this.formatRole(roleInfo.identity)}
            value={roleType}
            onClick={this.roleTypeChangeHandler}
          />
        </Layout>
        <AtActionSheet isOpened={isOpened} cancelText='取消'>
          <AtActionSheetItem onClick={this.logoutHandler}>
            确定
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}
