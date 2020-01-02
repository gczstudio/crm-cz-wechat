import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import Header from '@/components/header'
import Layout from '@/components/layout'
import { remindType } from '@/utils/enum'
import { formatDate } from '@/utils/index'

import './index.scss'


@connect(({message}) => ({
  ...message,
}))
export default class Message extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      msg: {
        content: ''
      }
    }
  }

  componentDidMount = () => {
    this.getMessageList()
  }

  //获取商机列表
  getMessageList = () => {
    this.props.dispatch({
      type: 'message/searchSnList'
    })
  }



  goDetail = (id) => {
    Taro.navigateTo({
      url: '/pages/home/businessManage/detail/index?id='+id
    })
  }

  showDetailHandler = (data) => {
    this.setState({
      msg: data
    })
    this.msgRef.show()
  }


  render() {
    const { messageList } = this.props
    const { msg } = this.state
    return (
      <View className='message-page'>
        <Header title='消息' showLeft={false} fixed />
       
        {
          messageList.map(item=>{
            return (
              <View className='list' key={item.id} onClick={()=>{this.showDetailHandler(item)}}>
                <View className='top'>
                  <View className='top-l'><AtIcon value='bell' size='15'></AtIcon><Text className='vertical-m'>{remindType[item.remindType]}：{item.remindName}</Text></View>
                  {/*<View className='top-r'><View className='dot'></View></View>*/}
                </View>
                <View className='middle'>
                  <AtIcon value='clock' size='15'></AtIcon><Text className='vertical-m'>{formatDate(item.pushTime)}</Text>
                </View>
              </View>
            )
          })
        }
        <Layout title={remindType[msg.remindType]} ref={node=>{this.msgRef = node}}>
          <View className='detail-content'>
            <AtIcon value='clock' size='15'></AtIcon><Text className='vertical-m'>{msg.content?formatDate(JSON.parse(msg.content).startDate):'--'}</Text>
            <View>{msg.content?JSON.parse(msg.content).scheduleDesc:'--'}</View>
          </View>
        </Layout>
      </View>
    )
  }
}
