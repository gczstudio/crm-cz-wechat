import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default class Header extends Component {

  static propTypes  = {
    fixed:PropTypes.bool,
    isBlank: PropTypes.bool,
    color: PropTypes.string,
    showLeft: PropTypes.bool,
    title: PropTypes.string,
    onClickLeft: PropTypes.func,
  }

  onClickHandler = () => {
    if(this.props.onClickLeft){
      this.props.onClickLeft()
      return
    }
    Taro.navigateBack({
      delta: 1
    })
  }

  render() {
    return (
      <View className={'header-page '+(this.props.fixed?'fixed':'')} style={{'color':this.props.color?'#fff':'#161616','background':this.props.color||'#fff'}}>
      {
        this.props.isBlank ? '' :
        <View className='header-content'>
          {
            this.props.showLeft ?
            <View className='header-icon' onClick={this.onClickHandler}>
              <AtIcon value='chevron-left' size='20' color={this.props.color? '#fff':'rgba(0,0,0,0.5)'}></AtIcon>
            </View>
            :''
          }
          <View className='header-title'>{this.props.title||''}</View>
        </View>
      }
      </View>
    )
  }
}
