import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import PropTypes from 'prop-types'
import './index.scss'

const loadStatusConfig = {
  canNotLoad: '没有更多数据~',
  noData: '暂无数据',
  loading: '加载中...',
  lessThanPageSize: "",
  lessTotalCount: ""
}

export default class Pagination extends Component {

  static propTypes  = {
    currentLen: PropTypes.number,
    totalCount: PropTypes.number,
    pageSize: PropTypes.number,
    onPull: PropTypes.func
  }

  static defaultProps = {
    currentLen: 0,
    totalCount: 0,
    pageSize: 10,
    onPullUp: null
  }
 
  constructor(props) {
    super(props)
    this.setState({
      loadStatus: 'noData'
    })
  }

  componentWillReceiveProps({currentLen, totalCount, pageSize}){
    let status = ''
    if(currentLen==0){
      status = 'noData'
    } else if(currentLen<pageSize){
      status = 'lessThanPageSize'
    } else if(currentLen<totalCount){
      status = 'lessTotalCount'
    } else if(currentLen>=totalCount){
      status = 'canNotLoad'
    } 
    this.setState({
      loadStatus: status
    })
  }

  ScrollToUpper() { //滚动到顶部事件
  
  }
  ScrollToLower() { //滚动到底部事件
    console.log('滚动到底部事件')
    const { loadStatus } = this.state
    if(loadStatus=='lessTotalCount'){
      this.setState({
        loadStatus: 'loading'
      })
      this.props.onPull&&this.props.onPull()
    }
  }



  render() {
    const { loadStatus } = this.state
      return (
        <View className='pagination'>
          <ScrollView
            className='scrollview'
            scrollY
            scrollWithAnimation
            onScrollToUpper={this.ScrollToUpper}
            onScrollToLower={this.ScrollToLower}
          >
            {this.props.children}
            <View className='pg-text'>
            {
              loadStatus==='loading'?
              <AtActivityIndicator content='加载中...' mode='center'></AtActivityIndicator>
              :
              <Text>{loadStatusConfig[loadStatus]}</Text>
            }
            </View>
          </ScrollView>
          
      </View>
    )
  }
}
