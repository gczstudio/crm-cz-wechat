import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import { formatDate } from '@/utils/index'

import './index.scss'

@connect(({todoList}) => ({
  ...todoList,
}))
export default class Todolist extends Component {

  componentWillMount(){
    this.getTodoList()
  }

  componentDidMount(){
    this.props.onRef(this)
  }

  getTodoList = () => {
    this.props.dispatch({
      type: 'todoList/searchTaskReminds'
    })
  }

  goDetail = (data) => {
    this.props.dispatch({
      type: 'todoList/saveCurrentDetail',
      payload: {
        currentDetail: data
      }
    })
    Taro.navigateTo({
      url: '/pages/home/todoList/detail/index'
    })
  }

  render() {
    const { todoLists } = this.props
    return (
      <View className='todoList-page'>
      {
        todoLists.map(item=>{
          return (<View className='list' key={item.id}>
                <View className='top'>
                  <View className='top-l'>{item.remindName}</View>
                  {
                    item.isDeal ? '':<View className='top-r'><View className='dot'></View>未读</View>
                  }
                </View>
                <View className='middle'>
                  {item.content}
                </View>
                <View className='bottom'>
                  <View className='bottom-l'><Text>{formatDate(item.pushTime)}</Text></View>
                  <View className='bottom-r' onClick={()=>{this.goDetail(item)}}><Text className='bottom-text'>查阅</Text><AtIcon value='chevron-right' color='#0070FF' size='15'></AtIcon></View>
                </View>
            </View>)
        })
      }
        
      </View>
    )
  }
}
