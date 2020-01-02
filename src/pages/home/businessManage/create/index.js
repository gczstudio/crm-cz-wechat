import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtForm, AtInput, AtButton, AtList, AtListItem, AtTextarea } from 'taro-ui'
import Header from '@/components/header'
import Layout from '@/components/layout'
import RelationSchedule from '@/components/relationSchedule'
import SelectCustomer from '@/components/selectCustomer'
import SelectRangeDate from '@/components/selectRangeDate'
import moment from 'moment'

import './index.scss'

@connect(({businessCreate}) => ({
  ...businessCreate
}))
export default class Create extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      desc: '',
      bgAndEndTime: [],
      custList: [],
      custNames: [],
      dailyIds: [],
      dailyNames: [],
      type: 0,
      isShow: true
    }
  }

  componentDidMount(){
    const { id, type, custName, custNo, custType } =  this.$router.params
    if(type==1){
      this.getBusinessDetail(id)
      return
    } 
    if(custName){
      this.setState({
        custList: [{
          custName,
          custNo,
          custType
        }],
        custNames: [custName]
      })
    }
  }

  componentWillReceiveProps({detailData}){
    if(detailData){
      const { name, remark, beginTime, endTime, custList, scheduleList } = detailData
      this.setState({
        name,
        desc: remark,
        bgAndEndTime: [moment(beginTime).format('YYYY-MM-DD'), moment(endTime).format('YYYY-MM-DD')],
        custList,
        custNames: this.getTypeNames(custList, 'custName'),
        dailyIds: this.getTypeNames(scheduleList, 'id'),
        dailyNames: this.getTypeNames(scheduleList, 'title'),
      })
    }
  }

  getTypeNames = (data, type) => {
    let arr = []
    data.forEach(item=>{
      arr.push(item[type])
    })
    return arr
  }

  getBusinessDetail = (id) => {
    this.props.dispatch({
      type: 'businessCreate/businessSearchById',
      data: {
        id: id
      }
    })
  }

  nameChangeHandler = (value) => {
    this.setState({
      name: value
    })
  }

  descChangeHandler = (e) => {
    this.setState({
      desc: e.detail.value
    })
  }

  selectCustomerHandler = () => {
    this.customerRef.show()
    this.selectCustomerRef.getBankCustomerList()
    this.setState({
      isShow: false
    })
  }

  onSureCustomerHandler = (data) => {
    console.log(data)
    this.setState({
      custList: data,
      custNames: this.getTypeNames(data, 'custName')
    })
    this.customerRef.hide()
    this.setState({
      isShow: true
    })
  }

  relationScheduleHandler = () => {
    this.scheduleRef.show()
    this.selectScheduleRef.getScheduleList()
    this.setState({
      isShow: false
    })
  }

  onSureScheduleHandler = (data) => {
    console.log(data)
    this.setState({
      dailyIds: data.ids,
      dailyNames: data.names,
    })
    this.scheduleRef.hide()
    this.setState({
      isShow: true
    })
  }

  selectDateHandler = () => {
    this.dateRef.show()
    this.setState({
      isShow: false
    })
  }

  onRangeDateHandler = (date) => {
    this.setState({
      bgAndEndTime: [date.start, date.end]
    })
    this.dateRef.hide()
    this.setState({
      isShow: true
    })
  }

  onClickLeftHandler = () => {
    this.setState({
      isShow: true
    })
  }

  onSubmit = () => {
    const { type, name, desc, dailyIds, custList, bgAndEndTime } = this.state
    let params = {
      bgAndEndTime,
      busStatus: "NOT_TOUCH",
      busType: "SELF_BUILD",
      custList,
      // custType: "",
      dailyIds,
      desc,
      name,
    }
    if(type == 1){
      params.busId = this.$router.params.id
    }
    this.props.dispatch({
      type: type ==1 ? 'businessCreate/update' : 'businessCreate/create',
      data: {
        data: params,
        callback: ()=>{
          Taro.showToast({
            title: type ==1 ? '编辑成功' : '新建成功',
            icon: 'success',
            duration: 2000
          }).then(() => {
            Taro.navigateTo({
              url: '/pages/home/businessManage/index'
            })
          })
        }
      }
    })
  }

  render() {
    const { name, desc, bgAndEndTime, custList, custNames, dailyNames, dailyIds, isShow } = this.state
    const { type } = this.$router.params
    return (
      <View className='create-page'>
      <Header title={type==1?'编辑商机':'新建商机'} showLeft fixed />
      <AtForm
        onSubmit={this.onSubmit}
      >
          <View style='margin: 20px 0;'>
            <AtList>
              <AtInput 
                name='value' 
                type='text' 
                border={false}
                placeholder='输入商机标题' 
                value={name} 
                onChange={this.nameChangeHandler} 
              />
            </AtList>
          </View>
          <AtList>
            <AtListItem title='选择客户' arrow='right'  extraText={custNames.join(',') || '点击选择'} onClick={this.selectCustomerHandler} />
            <AtListItem title='商机日期' arrow='right'  extraText={bgAndEndTime.length>0? bgAndEndTime[0] + '/' + bgAndEndTime[1] : '点击选择'} onClick={this.selectDateHandler} />
          </AtList>
          <View style='margin: 20px 0'>
            <AtList>
              <AtListItem title='商机描述' />
              {
                isShow?
                <AtTextarea
                  value={desc}
                  onChange={this.descChangeHandler}
                  count={false}
                  placeholder='请输入商机描述'
                />
                : ''
              }
              
            </AtList>
          </View>
          <AtList>
            <AtListItem title='关联日程' arrow='right'  extraText={dailyNames.join(',')||'点击选择'} onClick={this.relationScheduleHandler} />
          </AtList>
          <View className='submit-btn'>
            <AtButton type='primary' formType='submit'>提交</AtButton>
          </View>
        </AtForm>
        <Layout title='关联日程' ref={node=>{this.scheduleRef = node}} onClickLeft={this.onClickLeftHandler}>
          <RelationSchedule defaultValue={{names:dailyNames,ids:dailyIds}} onRef={node=>{this.selectScheduleRef=node}} onSure={this.onSureScheduleHandler} />
        </Layout>
        <Layout title='选择商机时间' ref={node=>{this.dateRef = node}} onClickLeft={this.onClickLeftHandler}>
          <SelectRangeDate defaultValue={bgAndEndTime} onSure={this.onRangeDateHandler} />
        </Layout>
        <Layout title='选择客户' ref={node=>{this.customerRef = node}} onClickLeft={this.onClickLeftHandler}>
          <SelectCustomer defaultValue={custList} onRef={node=>{this.selectCustomerRef=node}} onSure={this.onSureCustomerHandler} />
        </Layout>
      </View>
    )
  }
}
