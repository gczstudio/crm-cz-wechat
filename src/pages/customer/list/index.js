import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import customerBusIcon from '@/images/customer-bus-icon.png'
import customerDetailIcon from '@/images/customer-detail-icon.png'
import phoneIcon from '@/images/phone-icon.png'
import calendarIcon from '@/images/calendar-icon.png'
import { fromTypeEnum } from '@/utils/enum'
import './index.scss'

export default class List extends Component {
  
  static propTypes  = {
    type: PropTypes.string,
    dataList: PropTypes.array,
  } 

  componentDidMount = () => {

  }

  goDetailHandler = (id, sourse) => {
    const { type } = this.props
    if((sourse == 1 && type == 'allBank') || !sourse){
      Taro.navigateTo({
        url: `/pages/customer/detail/index?id=${id}&type=${type}`
      })
    }
  }

  goFollowHandler = (id) => {
    Taro.navigateTo({
      url: `/pages/customer/follow/index?id=${id}`
    })
  }

  goCreateBusinessHandler = (data) => {
    //type 0 和 null 新建 1编辑
    const { type } =  this.props
    Taro.navigateTo({
      url: `/pages/home/businessManage/create/index?type=0&custName=${data.name}&custNo=${data.no}&custType=${type==='manager'?'BANK_CUST':'SUB_CUST'}`
    })
  }

  callPhoneHandler = (phone) => {
    Taro.makePhoneCall({
      phoneNumber: phone
    })
  }

  goCreateSheduleHandler = (data) => {
    Taro.navigateTo({
      url: `/pages/home/scheduleManage/createSchedule/index?type=0&bindName=${data.name}&bindId=${data.no}&bindType=3`
    })
  }
   

  render() {
    const { type, dataList=[] } = this.props
    return (
      <View className='list-page'>
        {
          dataList.map(item=>{
            return (
              <View className='list' key={item.no} onClick={()=>{this.goDetailHandler(item.no,1)}}>
                <View className='top'>
                  <View className='top-l'>{item.name}({item.no})</View>
                  {type == 'allBank'?'':<View className='top-r'><View className='dot'></View>{type=='manager'?`状态：${item.state}`:item.followState||'未跟进'}</View>}
                </View>
                <View className='middle'>
                  {
                    type=='manager'? 
                    <View><View>客户等级：{item.level}</View><View>时点储蓄余额：{item.totalBalance}元</View></View>
                    :
                    (type == 'latent'?
                    <View><View>客户来源：{fromTypeEnum[item.fromType]}</View><View>工单：{item.workOrder||'--'}</View></View>
                    :
                    <View><View>持有业务：{item.business}</View><View>归属支行：{item.belongOrgs[0].orgName}</View></View>
                    )
                  }
                  
                </View>
                {
                  type == 'allBank' ? '' :
                  <View className='bottom'>
                    <View className='bottom-l' onClick={()=>{this.goCreateBusinessHandler(item)}}><Image src={customerBusIcon} className='icon'></Image><Text className='bottom-text'>商机</Text></View>
                    <View className='bottom-l' onClick={()=>{this.callPhoneHandler(item.contactType)}}><Image src={phoneIcon} className='icon'></Image><Text className='bottom-text'>电话</Text></View>
                    <View className='bottom-l' onClick={()=>{this.goCreateSheduleHandler(item)}}><Image src={calendarIcon} className='icon'></Image><Text className='bottom-text'>日程</Text></View>
                    {
                      type == 'manager'?
                      <View className='bottom-l' onClick={()=>{this.goDetailHandler(item.no)}}><Image src={customerDetailIcon} className='icon'></Image><Text className='bottom-text'>详情</Text></View>
                      :
                      <View className='bottom-l' onClick={()=>{this.goFollowHandler(item.no)}}><Image src={customerDetailIcon} className='icon'></Image><Text className='bottom-text'>跟进</Text></View>
                    }
                  </View>
                }
              </View> 
            )
          })
        }
        
      </View>
    )
  }
}
