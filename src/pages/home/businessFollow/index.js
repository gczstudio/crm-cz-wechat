import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Pagination from '@/components/pagination'
import { busTypeEnum } from '@/utils/enum'
import followIcon from '@/images/follow-icon.png'
import moment from 'moment'


import './index.scss'

@connect(({businessFollowList}) => ({
  ...businessFollowList,
}))
export default class Businessfollow extends Component {

  constructor () {
    super(...arguments)
    this.state = {
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

  // componentWillMount = () => {
  //   this.getBusinessList()
  // }

  componentDidMount(){
    this.props.onRef(this)
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

  //获取商机列表
  getBusinessList = () => {
    this.props.dispatch({
      type: 'businessFollowList/businessSearchByPage',
      data: {
        page: this.businessPage,
        query: {
          status: 'NOT_TOUCH'
        }
      }
    })
  }

  businessListsPullHandler = () => {
    this.businessPage.page++
    this.getBusinessList()
  }


  goDetail = (id) => {
    Taro.navigateTo({
      url: '/pages/home/businessManage/detail/index?id='+id
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
      <View className='businessFollow-page'>
        <Pagination totalCount={businessLists.total} currentLen={businessLists.content.length} onPull={this.businessListsPullHandler}>
        {
          businessLists.content.map(item=>{
            return (  
              <View className='list' key={item.id}>
                <View className='top'>
                  <View className='top-l'>{item.name}</View>
                  <View className='top-r'><View className='dot'></View>未跟进</View>
                </View>
                <View className='middle'>
                  <View>类型：{busTypeEnum[item.busType]}</View>
                  <View className='source'>来源：{item.source}</View>
                </View>
                <View className='bottom'>
                  <View className='bottom-l'>创建时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : '--'}</View>
                  <View className='bottom-r' onClick={()=>{this.goDetail(item.id)}}><Image src={followIcon} className='follow-icon'></Image><Text className='bottom-text'>跟进</Text></View>
                </View>
              </View>
            )
          })
        }
        </Pagination>
        
      </View>
    )
  }
}
