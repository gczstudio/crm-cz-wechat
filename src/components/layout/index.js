import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Header from '@/components/header'
import PropTypes from 'prop-types'
import './index.scss'

export default class Layout extends Component {

  static propTypes  = {
    title: PropTypes.string,
    onClickLeft: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.state = {
      show: false
    }
  }

  onClickHandler = () => {
    this.props.onClickLeft&&this.props.onClickLeft()
    this.hide()
  }

  show = () => {
    this.setState({
      show: true
    })
  }

  hide = () => {
    this.setState({
      show: false
    })
  }

  render() {
    const { show } = this.state
    return (
      <View className={'layout-page '+(show?'show':'hide')}>
        <Header title={this.props.title} showLeft fixed onClickLeft={this.onClickHandler} />
        {
          this.props.children
        }
      </View>
    )
  }
}
