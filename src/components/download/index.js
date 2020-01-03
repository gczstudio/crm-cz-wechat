import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon  } from 'taro-ui'
import PropTypes from 'prop-types'
import { baseUrl } from '@/config/index'

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
      url: `${baseUrl}/common/file/download?id=${id}`,
      header: {
        'Content-Type': 'application/json',
        'Cookie': Taro.getStorageSync('Cookie')
      },
    }).then((data)=>{
      //返回的二进制流处理不了
      if (data.statusCode === 200) {
        Taro.saveFile({
          tempFilePath: data.tempFilePath,
          success: (res) => {
            console.log(res)
          },
          fail: function (err) {
            console.log('保存失败：', err)
          }
        });
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
