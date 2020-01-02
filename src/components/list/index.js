import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class List extends Component {

  render() {
    const { title, children } = this.props
    return (
      <View className='list-page'>
        <View className='title'>{title}</View>
        <View className='children'>
          {children}
        </View>
      </View>
    )
  }
}
