import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSearchBar, AtFab } from 'taro-ui'
import Header from '@/components/header'
import Pagination from '@/components/pagination'
import { busTypeEnum, busStatusEnum } from '@/utils/enum'
import moment from 'moment'
import followGrayIcon from '@/images/follow-gray-icon.png'
import editIcon from '@/images/edit-icon.png'
import detailIcon from '@/images/detail-icon.png'

import './index.scss'

@connect(({businessManage}) => ({
  ...businessManage,
}))
export default class Businessmanage extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      businessLists: {
        content: [],
        total: 0
      }
    }
    this.businessPage = {
      page: 1,
      size: 10
    }
  }

  componentWillMount = () => {
    this.getBusinessList()
  }

  componentWillReceiveProps({businessList}){

    let copyBusinessList = businessList
    if(this.businessPage.page !== 1){
      copyBusinessList = JSON.parse(JSON.stringify(this.state.businessLists))
      copyBusinessList.content = copyBusinessList.content.concat(businessList.content)
    }
    this.setState({
      businessLists: copyBusinessList
    })
  }

  onChangeHandler = value => {
    this.setState({
      value
    })
  }

  onActionClickHandler = () => {
    this.businessPage.page = 1
    this.getBusinessList()
  }

  //获取商机列表
  getBusinessList = () => {
    this.props.dispatch({
      type: 'businessManage/businessSearchByPage',
      data: {
        page: this.businessPage,
        query: {
          busInfo: this.state.value
        }
      }
    })
  }

  businessListsPullHandler = () => {
    this.businessPage.page++
    this.getBusinessList()
  }

  goCreateHandler = (type, id) => {
    //type 0 和 null 新建 1编辑
    Taro.navigateTo({
      url: `/pages/home/businessManage/create/index?type=${type}&id=${id}`
    })
  }

  goDetail = (id) => {
    Taro.navigateTo({
      url: `/pages/home/businessManage/detail/index?id=${id}`
    })
  }

  // followHandler = (id) => {
  //   Taro.navigateTo({
  //     url: '/pages/home/businessManage/follow/index?id='+id
  //   })
  // }

  formatBusCustList = (data) => {
    let arr = []
    data.forEach(item=>{
      arr.push(item.custName)
    })
    return arr.join(',')
  }

  render() {
    const { businessLists } = this.state
    return (
      <View className='businessManage-page'>
        <Header title='商机管理' showLeft fixed />
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChangeHandler}
          onActionClick={this.onActionClickHandler}
          placeholder='商机名称/客户姓名'
        />

      <Pagination totalCount={businessLists.total} currentLen={businessLists.content.length} onPull={this.businessListsPullHandler}>
        {
          businessLists.content.map(item=>{
            return (  
              <View className='list' key={item.id}>
                <View className='top'>
                  <View className='top-l'>{item.name}</View>
                  <View className={'top-r ' + (item.status.toLowerCase())}><View className='dot'></View>{busStatusEnum[item.status]}</View>
                </View>
                <View className='middle'>
                  <View>商机类型：{busTypeEnum[item.busType]}<Text style='margin-left: 20px'>来源：{item.source}</Text></View>
                  <View className='source'>关联客户：{this.formatBusCustList(item.busCustList)}</View>
                </View>
                <View className='bottom'>
                  <View className='bottom-l'>创建时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : '--'}</View>
                  <View className='bottom-r'>
                    {
                      item.status === 'NOT_TOUCH' || item.status === 'FIRST_TOUCH' || item.status === 'AGREEMENT' ?
                      <View className='btn' onClick={()=>{this.goDetail(item.id)}}><Image src={followGrayIcon} className='icon'></Image><Text className='btn-text'>跟进</Text></View>    
                      : ''      
                    }
                    {
                      item.status === 'NOT_TOUCH' ?
                      <View className='btn' onClick={()=>{this.goCreateHandler(1,item.id)}}><Image src={editIcon} className='icon'></Image><Text className='btn-text'>编辑</Text></View>
                      : ''
                    }
                    {
                      item.status === 'SUCCESS' || item.status === 'DEFEAT' ?
                      <View className='btn' onClick={()=>{this.goDetail(item.id)}}><Image src={detailIcon} className='icon'></Image><Text className='btn-text'>详情</Text></View>
                      : ''
                    }   
                  </View>
                </View>
              </View>
            )
          })
        }
        </Pagination>

        <View className='create-btn'>
          <AtFab onClick={this.goCreateHandler}>
            <Text className='at-fab__icon at-icon at-icon-add'></Text>
          </AtFab>
        </View>
      </View>
    )
  }
}
