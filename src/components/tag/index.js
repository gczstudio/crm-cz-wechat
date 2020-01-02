import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.scss'

export default class Tag extends Component {

  static propTypes  = {
    color: PropTypes.string,
  }

  render() {
    const { color, children } = this.props
    return (
      <View className='tag-page'>
        <View className='tag' style={{'color':color, 'border-color':color}}>
          {
            children
          }
        </View>
      </View>
      
    )
  }
}
