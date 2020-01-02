import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSegmentedControl } from 'taro-ui'
import SignIn from './signIn'
import List from './list'

import './index.scss'

@connect(({outsideWork}) => ({
  ...outsideWork,
}))
export default class Outsidework extends Component {
  config = {
    navigationBarTitleText: '考勤打卡',
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0
    }
  }
  handleClick = value => {
    this.setState({
      current: value
    })
  }

  render() {
    return (
      <View className='outsideWork-page'>
        <View className='tab'>
          <AtSegmentedControl
            values={['外勤签到', '签到列表']}
            onClick={this.handleClick}
            current={this.state.current}
          />
        </View>
        {
          this.state.current === 0
          ? <SignIn />
          : ''
        }
        {
          this.state.current === 1
          ? <List />
          : ''
        }
      </View>
    )
  }
}
