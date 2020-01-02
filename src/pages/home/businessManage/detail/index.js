import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtTabBar } from 'taro-ui'
import Steps  from '@/components/steps/index'
import Header from '@/components/header'
import Pagination from '@/components/pagination'
import { busStatusEnum } from '@/utils/enum'
import moment from 'moment'
import followGrayIcon from '@/images/follow-gray-icon.png'

import './index.scss'

@connect(({businessDetail}) => ({
  ...businessDetail,
}))
export default class Detail extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      current: 1,
      steps: [],
      logList: {
        content: []
      }
    }
    this.logPage = {
      page: 1,
      size: 10
    }
  }

  componentDidMount = () => {
    this.getBusiness()
    this.getLogList()
  }
  
  componentWillReceiveProps({logData}){
    this.getSteps()
    let copyLogData = logData
    if(this.logPage.page !== 1){
      copyLogData = JSON.parse(JSON.stringify(this.state.logList))
      copyLogData.content = copyLogData.content.concat(logData.content)
    }
    this.setState({
      logList: copyLogData
    })
  }

  getBusiness = () => {
    this.props.dispatch({
      type: 'businessDetail/businessSearchById',
      data: {
        id: this.$router.params.id
      }
    })
  }

  getLogList = () => {
    this.props.dispatch({
      type: 'businessDetail/searchLogPage',
      data: {
        page: this.logPage,
        // pageSort: [
        //   {
        //     field: "",
        //     type: ""
        //   }
        // ],
        query: {
          rtItemId: this.$router.params.id,
          rtItemType: 'BUSINESS'
        }
      }
    })
  }

  followHandler = () => {
    Taro.navigateTo({
      url: `/pages/home/businessManage/follow/index?id=${this.$router.params.id}`
    })
  }




  logListPullHandler = () => {
    this.logPage.page++
    this.getLogList()
    
  }

  getSteps = () => {
    const { detailData } = this.props
    switch(detailData.status){
      case 'FIRST_TOUCH':
        this.setState({
          steps: [
            { 'title': '未跟进'},
            { 'title': '初次接触'},
            { 'title': '达成意向'},
            { 'title': '转化成功'}
          ],
          current: 1
        })
        break;
      case 'AGREEMENT':
        this.setState({
          steps: [
            { 'title': '未跟进'},
            { 'title': '初次接触'},
            { 'title': '达成意向'},
            { 'title': '转化成功'}
          ],
          current: 2
        })
        break;
      case 'SUCCESS':
        this.setState({
          steps: [
            { 'title': '未跟进'},
            { 'title': '初次接触'},
            { 'title': '达成意向'},
            { 'title': '转化成功'}
          ],
          current: 3
        })
        break;
      case 'DEFEAT':
        this.setState({
          steps: [
            { 'title': '未跟进'},
            { 'title': '初次接触'},
            { 'title': '达成意向'},
            { 'title': '转化失败'}
          ],
          current: 3
        })
        break;
      default:
        this.setState({
          steps: [
            { 'title': '未跟进'},
            { 'title': '初次接触'},
            { 'title': '达成意向'},
            { 'title': '转化成功'}
          ],
          current: 0
        })
    }
  }

  render() {
    const { detailData } = this.props
    const { current, steps, logList } = this.state
    return (
      <View className='detail-page'>
        <Header title={detailData.name} showLeft fixed />
        <View className='table'>
          <View className='tr'>
            <View className='th'>关联客户</View>
            <View className='th'>时点储蓄存款余额</View>
          </View>
          {
            detailData.custList.map(item=>{
              return (
                <View className='tr' key={item.custNo}>
                  <View className='td'>{item.custName}</View>
                  <View className='td'>{item.pointAssets}元</View>
                </View>
              )
            })
          }
        </View>
        <View className='step'>
          <Steps item={steps} current={current} />
        </View>
        <View className='history'>跟进历史</View>
        <View className='history-list'>
          <Pagination totalCount={logList.total} currentLen={logList.content.length} onPull={this.logListPullHandler}> 
            {
              logList.content.map(item=>{
                return (
                  <View className='list' key={item.id}>
                    <View className='date'>{item.time ? moment(item.time).format('MM-DD') : '--'}</View>
                    <View className='card'>
                      <View className='top'>
                        <View className='top-l'>{busStatusEnum[item.status]}</View>
                        <View className='top-r'></View>
                      </View>
                      <View className='middle'>
                      {item.remark || '--'}
                      </View>
                      <View className='bottom'>
                        <View className='bottom-l'><AtIcon value='clock' size='15'></AtIcon><Text style='vertical-align: middle;margin-left: 5px;'>{item.time ? moment(item.time).format('YYYY-MM-DD HH:mm') : '--'}</Text></View>
                      </View>
                    </View>
                  </View>
                )
              })
            }    
          </Pagination>
        </View>
        {
          detailData.status === 'NOT_TOUCH' || detailData.status === 'FIRST_TOUCH' || detailData.status === 'AGREEMENT'?
          <AtTabBar
            fixed
            color='#6D7385'
            selectedColor='#6D7385'
            iconSize={15}
            fontSize={12}
            tabList={[
              { title: '商机跟进', image: followGrayIcon }
            ]}
            onClick={this.followHandler}
          />
          : ''
        }      
      </View>
    )
  }
}