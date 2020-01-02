import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem, AtTabBar  } from 'taro-ui'
import Tag from '@/components/tag'
import Header from '@/components/header'
import customerBusIcon from '@/images/customer-bus-icon.png'
import phoneIcon from '@/images/phone-icon.png'
import calendarIcon from '@/images/calendar-icon.png'
import './index.scss'

@connect(({customerDetail}) => ({
  ...customerDetail,
}))
export default class Detail extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  componentWillMount(){
    this.getCustomerDetailDoc()
    this.getCustomerInfoBasicDoc()
    this.findByNo()
    this.getContactTime()
    this.getCustomerHoldProductDoc()
    this.getCustomerTag()
  }

  getCustomerDetailDoc = () => {
    this.props.dispatch({
      type: 'customerDetail/getCustomerDetailDoc',
      data: {
        customerNo: this.$router.params.id
      }
    })
  }

  getCustomerInfoBasicDoc = () => {
    this.props.dispatch({
      type: 'customerDetail/getCustomerInfoBasicDoc',
      data: {
        customerNo: this.$router.params.id
      }
    })
  }

  findByNo = () => {
    this.props.dispatch({
      type: 'customerDetail/findByNo',
      data: {
        nos: this.$router.params.id
      }
    })
  }

  

  getContactTime = () => {
    this.props.dispatch({
      type: 'customerDetail/getContactTime',
      data: {
        customerNo: this.$router.params.id
      }
    })
  }

  getCustomerHoldProductDoc = () => {
    this.props.dispatch({
      type: 'customerDetail/getCustomerHoldProductDoc',
      data: {
        customerNo: this.$router.params.id
      }
    })
  }

  getCustomerTag = () => {
    this.props.dispatch({
      type: 'customerDetail/getCustomerTag',
      data: {
        customerNo: this.$router.params.id
      }
    })
  }



  handleClick = value => {
    this.setState({
      current: value
    })
    switch (value) {
      case 0:
        this.goCreateBusinessHandler()
        break;
      case 1:
        this.goCreateSheduleHandler()
        break;
      case 2:
        this.callPhoneHandler()
        break;
    }
  }

  goCreateBusinessHandler = (data) => {
    //type 0 和 null 新建 1编辑
    const { type } =  this.$router.params
    const { findInfo, basicInfo } = this.props
    Taro.navigateTo({
      url: `/pages/home/businessManage/create/index?type=0&custName=${findInfo.name}&custNo=${basicInfo.no}&custType=${type==='manager'?'BANK_CUST':'SUB_CUST'}`
    })
  }

  callPhoneHandler = () => {
    const { findInfo, basicInfo } = this.props
    Taro.makePhoneCall({
      phoneNumber: basicInfo.phone
    })
  }

  goCreateSheduleHandler = (data) => {
    const { findInfo, basicInfo } = this.props
    Taro.navigateTo({
      url: `/pages/home/scheduleManage/createSchedule/index?type=0&bindName=${findInfo.name}&bindId=${basicInfo.no}&bindType=3`
    })
  }

  render() {

    const tabList = [
      { title: '创建商机', image: customerBusIcon},
      { title: '创建日程', image: calendarIcon},
      { title: '拨打电话', image: phoneIcon}
    ]
    const { current } = this.state
    const { detailInfo, basicInfo, findInfo, timeInfo, productInfo, tagList } =  this.props
    const { type } = this.$router.params
    return (
      <View className='detail-page'>
        <Header title={findInfo.name} showLeft fixed />
        <View className='table'>
          <View className='tr'>
            <View className='th'>客户年龄</View>
            <View className='th'>客户性别</View>
            <View className='th'>客户等级</View>
          </View>
          <View className='tr'>
            <View className='td'>{findInfo.age||'--'}</View>
            <View className='td'>{findInfo.sex||'--'}</View>
            <View className='td'>{findInfo.level||'--'}</View>
          </View>
          <View className='tr'>
            <View className='th'>储蓄余额</View>
            <View className='th'>理财余额</View>
            <View className='th'>贷款余额</View>
          </View>
          <View className='tr'>
            <View className='td'>{detailInfo.balance}元</View>
            <View className='td'>{detailInfo.financial}元</View>
            <View className='td'>{detailInfo.deposit}元</View>
          </View>
        </View>
        <AtList>
          <View className='basic-info-title'>
            <AtListItem title='基本信息' />
          </View>
          <AtListItem title='客户编号' extraText={basicInfo.no||'--'} />
          <AtListItem title='婚姻状况' extraText={basicInfo.marriage||'--'} />
          <AtListItem title='籍贯' extraText={basicInfo.nativePlace||'--'} />
          <AtListItem title='民族' extraText={basicInfo.national||'--'} />
          <AtListItem title='学历' extraText={basicInfo.edu||'--'} />
          <AtListItem title='行业' extraText={basicInfo.industry||'--'} />
          <AtListItem title='月收入' extraText={basicInfo.monthlyIncome||'--'} />
          <AtListItem title='住宅类型' extraText={basicInfo.houseOwnership||'--'} />
          <AtListItem title='车辆持有情况' extraText={basicInfo.carOwnership||'--'} />
          <AtListItem title='个体工商户主' extraText={basicInfo.individualHousehold||'--'} />
          <AtListItem title='企业高管' extraText={basicInfo.executives||'--'} />
          <AtListItem title='行内法人' extraText={basicInfo.legalPerson||'--'} />
          <AtListItem title='联系时间偏好' extraText={timeInfo?timeInfo.timeStart+'/'+timeInfo.end:'--'} />
        </AtList>
        <View className='basic-header'>
          <View className='at-icon at-icon-bookmark'></View><Text style='margin-left: 5px;vertical-align:middle;'>客户标签</Text>
        </View>
        <View className='customer-tag'>
          {
            tagList.map(item=>{
              return (
                <Tag key={item.id} color='#1890FF'>{item.name}</Tag>
              )
            })
          }
        </View>
        
        {
          productInfo.holdAgentPayment?
          <View>
            <View className='basic-header'>
            <View className='at-icon at-icon-bookmark'></View><Text style='margin-left: 5px;vertical-align:middle;'>签约产品</Text>
            </View>
            <View className='customer-tag'>
            {productInfo.holdAgentPayment?<Tag>代收代付</Tag>:''}
            {productInfo.holdCard?<Tag>借记卡</Tag>:''}
            {productInfo.holdDeposit?<Tag>存款</Tag>:''}
            {productInfo.holdFinancial?<Tag>理财</Tag>:''}
            {productInfo.holdLoan?<Tag>贷款</Tag>:''}
            {productInfo.holdMobileBank?<Tag>手机银行</Tag>:''}
            {productInfo.holdNetBank?<Tag>网银</Tag>:''}
            {productInfo.holdPayrollCredit?<Tag>代发工资</Tag>:''}
            {productInfo.holdWxBank?<Tag>微信银行</Tag>:''}
            </View>
          </View>
          :''
        }
        {
          type == 'allBank'? '':
          <AtTabBar
            fixed
            color='#6D7385'
            selectedColor='#6D7385'
            iconSize={20}
            fontSize={12}
            tabList={tabList}
            onClick={this.handleClick}
            current={current}
         />
        }
        
      </View>
    )
  }
}
