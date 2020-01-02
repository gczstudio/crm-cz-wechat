import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon  } from 'taro-ui'
import PropTypes from 'prop-types'

import './index.scss'

@connect(({download}) => ({
  ...download,
}))
export default class Download extends Component {
  static propTypes  = {
    list: PropTypes.array,
  }


  downloadHandler = (id) => {
    Taro.downloadFile({
      url: `http://192.168.1.74:8080/crm/common/file/download?id=${id}`
    }).then((res)=>{
      if (res.statusCode === 200) {
       console.log(res)
      }
    })
  }

  render() {
    const { list } = this.props
    return (
      <View className='download-page'>
        {
          list&&list.map(item=>{
            return (
              <View className='file-list' key={item.id}>
                <AtIcon value='file-generic' size='15' color='#999'></AtIcon>
                <Text className='file-name'>{item.name}</Text>
                <Text className='file-size'>{item.size?(parseFloat(item.size)/1024).toFixed(2):''}</Text>
                <AtIcon value='arrow-down' size='15' color='#999' onClick={()=>{this.downloadHandler(item.id)}}></AtIcon>
              </View>
            )
          })
        }
      </View>
    )
  }
}
