import Taro, { Component } from '@tarojs/taro'
import { View, Text, RichText } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtSearchBar } from 'taro-ui'
import Header from '@/components/header'
import Pagination from '@/components/pagination'
import moment from 'moment'
import './index.scss'


@connect(({announcement}) => ({
  ...announcement,
}))
export default class Announcement extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      announcementLists: {
        content: []
      }
    }

    this.announcementPage = {
      page: 1,
      size: 10
    }
  }


  componentDidMount() {
    this.getAnnouncementList()
  }

  componentWillReceiveProps({announcementList}){
    let copyAnnouncementList = announcementList
    if(this.announcementPage.page !== 1){
      copyAnnouncementList = JSON.parse(JSON.stringify(this.state.announcementLists))
      copyAnnouncementList.content = copyAnnouncementList.content.concat(announcementList.content)
    }
    this.setState({
      announcementLists: copyAnnouncementList
    })
  }

  //获取公告列表
  getAnnouncementList = () => {
    this.props.dispatch({
      type: 'announcement/searchReceiveAnnouncement',
      data: {
        page: this.announcementPage,
        query: {
          announcementName: this.state.value,
        }
      }
    })
  }

  //公告上拉加载更多
  bankCustomerPullHandler = () => {
    this.announcementPage.page++
    this.getAnnouncementList()
  }

  onChangeHandler = value => {
    this.setState({
      value
    })
  }

  onActionClickHandler = () => {
    this.announcementPage.page = 1
    this.getAnnouncementList()
  }

  goDetail = (id) => {
    Taro.navigateTo({
      url: `/pages/home/announcement/detail/index?id=${id}`
    })
  }

  render() {
    const { announcementLists } = this.state
    return (
      <View className='announcement-page'>
        <Header title='公告管理' showLeft fixed />
        <View className='search-box'>
          <AtSearchBar
            value={this.state.value}
            onChange={this.onChangeHandler}
            onActionClick={this.onActionClickHandler}
            placeholder='公告名称'
          />
        </View>
        <View className='list'>
          <Pagination totalCount={announcementLists.total} currentLen={announcementLists.content.length} onPull={this.announcementPullHandler}>
            {
              announcementLists.content.map(item=>{
                return (
                  <View className={'list-item ' + (item.readState==0?'':'unread')} key={item.id}>
                    <View className='top'>
                      <View className='top-l'>{item.title}<Text className='tag'>总行</Text></View>
                      <View className='top-r'><View className='dot'></View>{item.readState==0?'未读':'已读'}</View>
                    </View>
                    <View className='middle' >
                      <RichText nodes={item.content} />
                    </View>
                    <View className='bottom'>
                      <View className='bottom-l'><AtIcon value='clock' size='15'></AtIcon><Text style='vertical-align: middle;margin-left: 5px;'>{item.createDt ? moment(item.createDt).format('YYYY-MM-DD HH:ss'):'--'}</Text></View>
                      <View className='bottom-r' onClick={()=>{this.goDetail(item.id)}}><Text className='bottom-text' style='vertical-align: middle'>查阅详情</Text><AtIcon value='chevron-right' size='15'></AtIcon></View>
                    </View>
                  </View>
                  )
              })  
            }
          </Pagination>
        </View>
      </View>
    )
  }
}
