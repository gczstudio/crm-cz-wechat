import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'


export default class Steps extends Component {

  static propTypes  = {
    item: PropTypes.array,
    current: PropTypes.number
  }
  

  render() {
    const { item, current } = this.props
    return (
      <View className='steps-page'>
        {
          item.map((ele, index)=>{
            return (
              <View className={'steps__item '+(index <= current?'steps__item--active':'')} key={ele.title}>
                <View className='steps__circular-wrap'>
                  {index == 0?'':<View className='steps__left-line'></View>}
                  <View className={'steps__circular '+(index == 0 ? 'steps__circular--block':'')}></View>
                  {index == (item.length-1)?'':<View className='steps__right-line'></View>}
                </View>
                <View className='steps__title'>{ele.title}</View>
              </View>
            )
          })
        }
      </View>
    )
  }
}
