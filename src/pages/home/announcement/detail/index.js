import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, RichText } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtFloatLayout, AtTextarea } from 'taro-ui'
import Download from '@/components/download'
import dianzanActive from '@/images/dianzan-active.png'
import Header from '@/components/header'
import { formatDate, getTypeNames } from '@/utils/index'
import { baseUrl } from '@/config/index'
import avatar from '@/images/avatar.png'

import './index.scss'

@connect(({announcementDetail}) => ({
  ...announcementDetail,
}))
export default class Detail extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      isOpened: false,
      value: '',
      replyCommentId: '',
      isReply: false,
      avatars: []
    }
  }

  componentDidMount () {
    this.getAnnouncementDetail()
  }

  getAnnouncementDetail = () => {
    const { id } = this.$router.params
    this.props.dispatch({
      type: 'announcementDetail/announcementDetail',
      data: {
        data: {
          id
        },
        callback: (data) =>{
          this.getAvatars(data.replyCommentList)
        }
      }
    })
  }

  showLayout = () => {
    this.setState({
      isOpened: true,
      isReply: false
    })
  }

  valueChangeHandler = (e) => {
    this.setState({
      value: e.detail.value
    })
  }


  onReplyHandler = (id) => {
    this.setState({
      replyCommentId: id
    })
    this.setState({
      isOpened: true,
      isReply: true
    })
  }

  saveReplyComment = () => {
    this.props.dispatch({
      type: 'announcementDetail/saveReplyComment',
      data: {
        data: {
          commentaryCategory: this.state.value,
          relationId: this.$router.params.id,
          relationType: 3
        },
        callback: () => {

          Taro.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 2000
          }).then(() => {
            this.getAnnouncementDetail()
          })
        }
      }
    })
  }

  reportReplyComment = () => {
    const { value, replyCommentId } =  this.state
    this.props.dispatch({
      type: 'announcementDetail/reportReplyComment',
      data: {
        data: {
          replyCommentId,
          commentaryCategory: value,
          relationId: this.$router.params.id,
          relationType: 3
        },
        callback: () => {
          Taro.showToast({
            title: '回复成功',
            icon: 'success',
            duration: 2000
          }).then(() => {
            this.getAnnouncementDetail()
          })
        }
      }
    })
  }

  publishHandler = () => {
    const { isReply } = this.state
    this.setState({
      isOpened: false
    })
    isReply ? this.reportReplyComment() : this.saveReplyComment()
    
  }

  //请求头像 (请求一个成功之后再请求下一个，同时请求会很慢)
  async getAvatars(data){
    for(let item of data){
      const response = await this.fetchFunc(item.createName.headIconId);
      let copyAvatars = JSON.parse(JSON.stringify(this.state.avatars));
      copyAvatars.push('data:image/png;base64,'+Taro.arrayBufferToBase64(response.data)); 
      this.setState({
        avatars: copyAvatars
      })
    }

  }

  fetchFunc = (id) => {
    return new Promise((resolve, reject)=>{
      Taro.request({
          url: `${baseUrl}/common/file/download?id=${id}`,
          method: 'GET',
          responseType: 'arraybuffer',
          header: {
            'Content-Type': 'application/json',
            'Cookie': Taro.getStorageSync('Cookie')
          },
          success: (res) => {
            resolve(res)
            
          },
          fail: (err) => {
            reject(err)
          }
        })
    })
  }

  render() {
    const { isOpened, avatars } = this.state
    const { detailData, files } = this.props
    return (
      <View className='detail-page'>
        <Header title='公告详情' showLeft fixed />
        <View className='detail-content'>
          <View className='title'>{detailData.title}</View>
          <View className='time'><AtIcon value='clock' size='15'></AtIcon><Text style='vertical-align: middle;margin-left: 5px;'>{formatDate(detailData.createDt)}</Text></View>
          <View className='person'>
            <AtIcon value='user' size='15'></AtIcon>
            <Text style='vertical-align: middle;margin-left: 5px;'>发起人：{detailData.publisherName}</Text>
            <Text style='vertical-align: middle;margin-left: 20px;'>发送给：{detailData.readPerson?getTypeNames(detailData.readPerson.concat(detailData.unReadPerson),'userName').join(','):'--'} </Text>
          </View>
          <View className='content'>
            <RichText nodes={detailData.content} />
          </View>
          <Download list={files} />
          <View className='thumbs-up'>
            <View className='thumbs-up-tag'>
              <View className='hand'>
                <Image src={dianzanActive} style='width: 100%;height: 100%;'></Image>
              </View>
            </View>
            <Text>{detailData.supportCount}人赞过</Text>
          </View>
          <View className='comment'>
            <View className='list-title'>全部评论（{detailData.replyCommentNumber}）</View>
            {
              detailData.replyCommentList.map((item, index)=>{
                return (
                  item.superiorReplyComment? 
                  <View className='list' key={item.id}>
                    <View className='img'>
                    <Image src={avatars[index] || avatar} style='width: 100%;height: 100%;border-radius: 50%;'></Image>
                    </View>
                    <View className='list-left'>
                        <View className='list-handler'>
                          <Text className='comment-name'>{item.createName.userName}</Text>
                          <Text className='comment-time'>{formatDate(item.replyCommentTime)}</Text>
                          <View className='icon-reply at-icon at-icon-message' onClick={()=>this.onReplyHandler(item.id)}></View>
                        </View>
                        <View className='reply-content'>
                          <View className='current-content'>
                            <View>回复<Text className='reply-name'>{item.superiorReplyComment.createName.userName}</Text>:</View>
                            <View>{item.commentaryCategory}</View>
                          </View>
                          <View className='origin-conent'>
                            <Text className='origin-name'>{item.superiorReplyComment.createName.userName}</Text>
                            <Text className='origin-time'>{formatDate(item.superiorReplyComment.createName.replyCommentTime)}</Text>
                            <View className='origin-text'>
                            {item.superiorReplyComment.commentaryCategory}
                            </View>
                            {/*<Text className='view-all'>查看全部</Text>*/}
                          </View>
                        </View>
                    </View>
                  </View>
                  :
                  <View className='list' key={item.id}>
                    <View className='img'>
                    <Image src={avatars[index] || avatar} style='width: 100%;height: 100%;border-radius: 50%;'></Image>
                    </View>
                    <View className='list-left'>
                        <View className='list-handler'>
                          <Text className='comment-name'>{item.createName.userName}</Text>
                          <Text className='comment-time'>{formatDate(item.replyCommentTime)}</Text>
                          <View className='icon-reply at-icon at-icon-message' onClick={()=>this.onReplyHandler(item.id)}></View>
                        </View>
                        <View className='reply-content'>
                          <View className='current-content'>
                          {item.commentaryCategory}
                          </View>
                        </View>
                    </View>
                  </View>
                )
              })

            }
          </View>
          <View className='self-input' onClick={this.showLayout}>请输入评论内容...</View>
          <AtFloatLayout isOpened={isOpened} >
            <AtTextarea
              value={this.state.value}
              onChange={this.valueChangeHandler}
              maxLength={200}
              placeholder='请输入评论内容...'
            />
            <View className='publish' onClick={this.publishHandler}>发布</View>
          </AtFloatLayout>
        </View>
      </View>
    )
  }
}
