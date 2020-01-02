import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtForm, AtInput, AtButton, AtList, AtListItem, AtTextarea, AtRadio, AtTabBar, AtActionSheet, AtActionSheetItem  } from 'taro-ui'
import PickerTime from '@/components/pickerTime'
import List from '@/components/List'
import Header from '@/components/header'
import Layout from '@/components/layout'
import RelationMatter from '@/components/relationMatter'
import { scheduleTypeEnum, remindDateEnum } from '@/utils/enum'
import moment from 'moment'

import './index.scss'

@connect(({createSchedule}) => ({
  ...createSchedule
}))
export default class Createschedule extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      bindId: [],
      bindName: [],
      bindType: [],
      place: "",
      remindDate: "",
      scheduleDesc: "",
      scheduleType: "",
      title: "",
      startDate: '',
      endDate: '',
      type: 0,   // 0 新建 1 详情 2 编辑
      isOpened: false,
      isShow: true, //控制textarea显示
    }
  }

  componentWillMount = () => {
    const { type=0, bindName, bindId, bindType } = this.$router.params
    this.setState({
      type
    })
    if(type == 1){
      this.getScheduleDetail()
      return
    }
    if(bindName){
      this.setState({
        bindId: [bindId],
        bindName: [bindName],
        bindType: [bindType]
      })
    }
    
  }

  getScheduleDetail = () => {
    this.props.dispatch({
      type: 'createSchedule/scheduleDetail',
      data: {
        id: this.$router.params.id
      }
    })
  }


  //格式化枚举类型
  formatEnum = (data) => {
    let arr = []
    for(var k in data){
      arr.push({
        label: data[k],
        value: k
      })
    }
    return arr
  }

  onTitleChangeHandler = (value) => {
    this.setState({
      title: value
    })
  }

  onPlaceChangeHandler = (value) => {
    this.setState({
      place: value
    })
  }

  scheduleDescHandler = (e) => {
    this.setState({
      scheduleDesc: e.detail.value
    })
  }


  onSubmit = () => {
    const { bindId, bindName, bindType, place, remindDate, scheduleDesc, scheduleType, title, startDate, endDate, type } = this.state
    let params = {
      participantsReq: {
        kind: [],
        mechanism: [],
        participants: []
      },
      relationFileIds: [],
      remindPersonsResp: {  //编辑和新建这两个字段不同，编辑多一个s
        remindKind: [],
        remindMechanism: [],
        remindPersons: []
      },
      bindId,
      bindName,
      bindType,
      startDate,
      endDate,
      place,
      remindDate,
      scheduleDesc,
      scheduleType,
      title
    }
    // console.log(params, 111)
    // return
    if(type == 2){
      params.id = this.$router.params.id
    }
    this.props.dispatch({
      type: type == 0 ? 'createSchedule/create' : 'createSchedule/update',
      data: {
        data: params,
        callback: () => {
          Taro.showToast({
            title: type == 0 ? '新建成功' : '编辑成功',
            icon: 'success',
            duration: 2000
          }).then(() => {
            if(type == 2) {
              this.setState({
                type: 1
              })
              this.getScheduleDetail()
              return
            }
            Taro.navigateTo({
              url: '/pages/home/scheduleManage/index'
            })
          })
        }
      }
    })
  }

  scheduleTypeHandler = () => {
    this.scheduleTypeRef.show()
    this.setState({
      isShow: false
    })
  }

  remindTypeHandler = () => {
    this.remindTypeRef.show()
    this.setState({
      isShow: false
    })
  }

  scheduleTypeChangeHandler = (value) => {
    this.setState({
      scheduleType: value,
      isShow: true
    })
    this.scheduleTypeRef.hide()
  }

  remindDateChangeHandler = (value) => {
    this.setState({
      remindDate: value,
      isShow: true
    })
    this.remindTypeRef.hide()
  }

  startTimeHandler = (date) => {
    this.setState({
      startDate: date
    })
  }

  endTimeHandler = (date) => {
    this.setState({
      endDate: date
    })
  }


  relationMatterHandler = () => {
    this.relationMatterRef.show()
    this.setState({
      isShow: false
    })
  }

  onSureRelationMatterHandler = (data) => {
    console.log(data, 11111111111)
    const { bindId, bindName, bindType } = data
    this.setState({
      bindId,
      bindName,
      bindType,
    })
    this.relationMatterRef.hide()
    this.setState({
      isShow: true
    })
  }

  onClickLeftHandler = () => {
    this.setState({
      isShow: true
    })
  }

  tabClickHandler = (value) => {
    console.log('zhix')
    if(value ==0 ){
      const { place, remindDate, scheduleDesc, scheduleType, title, startDate, endDate, scheduleBind } = this.props.detailData
      this.setState({
        bindId: this.formatBind(scheduleBind,'bindId'),
        bindName: this.formatBind(scheduleBind,'bindName'),
        bindType: this.formatBind(scheduleBind,'bindType'),
        place,
        remindDate,
        scheduleDesc,
        scheduleType,
        title,
        startDate: moment(startDate).format('YYYY-MM-DD HH:mm'),
        endDate:  moment(endDate).format('YYYY-MM-DD HH:mm'),
        type: 2
      })
      return
    }

    this.setState({
      isOpened: true
    })
  }

  deleteHandler = () => {
    this.props.dispatch({
      type: 'createSchedule/removeSchedule',
      data: {
        data: {
          scheduleId: this.$router.params.id
        },
        callback: () => {
          this.setState({
            isOpened: false
          })
          Taro.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          }).then(() => {
            Taro.navigateTo({
              url: '/pages/home/scheduleManage/index'
            })
          })
        }
      }
    })
  }

  formatBind= (data, key) => {
    let arr = []
    data&&data.forEach(item=>{
      arr.push(item[key])
    })
    return arr
  }

  render() {
    const { title, place, scheduleDesc, scheduleType, remindDate, bindName, bindType, bindId, startDate, endDate, type, isOpened, isShow } = this.state
    const { detailData } = this.props
    const titles = ['新建日程','日程详情','编辑日程']
    return (
      <View className='createSchedule-page'>
        <Header title={titles[Number(type)]} showLeft fixed />
        {
          type == 1 ? 
          <View className='edit-container'>
            <AtList>
              <AtListItem title='日程标题' extraText={detailData.title || '--'} />
              <AtListItem title='日程类型' extraText={scheduleTypeEnum[detailData.scheduleType] || '--'} />
              <AtListItem title='开始时间' extraText={moment(detailData.startDate).format('YYYY-MM-DD HH:mm') || '--'} />
              <AtListItem title='结束时间' extraText={moment(detailData.endDate).format('YYYY-MM-DD HH:mm') || '--'} />
              <AtListItem title='日程地点' extraText={detailData.place || '--'} />
              <View style='margin: 20px 0'>
                <AtList>
                  <AtListItem title='日程描述' />
                  <AtTextarea
                    value={detailData.scheduleDesc}
                    placeholder='--'
                    disabled
                    count={false}
                  />
                </AtList>
              </View>
              <AtListItem title='关联事项' extraText={this.formatBind(detailData.scheduleBind,'bindName').join(',') || '--'} />
              <AtListItem title='到期提醒' extraText={remindDateEnum[detailData.remindDate] || '--'} />
              <AtListItem title='创建时间' extraText={moment(detailData.createDate).format('YYYY-MM-DD HH:mm') || '--'} />
            </AtList>
            <AtTabBar
              fixed
              color='#6D7385'
              selectedColor='#6D7385'
              iconSize={15}
              fontSize={12}
              tabList={[
                { title: '编辑日程', iconType: 'edit' },
                { title: '删除日程', iconType: 'trash' },
              ]}
              onClick={this.tabClickHandler}
            />
            <AtActionSheet isOpened={isOpened} cancelText='取消'>
              <AtActionSheetItem onClick={this.deleteHandler}>
                确定
              </AtActionSheetItem>
            </AtActionSheet>
          </View>  
          :
          <AtForm
            onSubmit={this.onSubmit}
            onReset={this.onReset}
          >
            <AtList>
              <View className='title'>
                <AtInput 
                  name='value' 
                  type='text' 
                  placeholder='新建日程' 
                  value={title} 
                  onChange={this.onTitleChangeHandler} 
                />
              </View>
              <AtListItem title='日程类型' arrow='right'  extraText={scheduleType ? scheduleTypeEnum[scheduleType] : '点击选择'} onClick={this.scheduleTypeHandler} />
              <List title='开始时间'><PickerTime defaultValue={startDate} onChange={this.startTimeHandler} /></List>
              <List title='结束时间'><PickerTime defaultValue={endDate} onChange={this.endTimeHandler} /></List>
              <AtInput 
                name='value' 
                type='text' 
                title='日程地点'
                placeholder='请输入地址' 
                value={place} 
                onChange={this.onPlaceChangeHandler} 
              />
              <View className='schedule-desc'>
                <AtListItem title='日程描述' />
                {
                  isShow?
                  <AtTextarea
                    value={scheduleDesc}
                    onChange={this.scheduleDescHandler}
                    placeholder='请输入描述信息'
                    count={false}
                  />
                  : ''
                }
                
              </View>
              <AtListItem title='关联事项' arrow='right'  extraText={bindName.join(',')||'点击选择'} onClick={this.relationMatterHandler} />
              <AtListItem title='到期提醒' arrow='right'  extraText={remindDate ? remindDateEnum[remindDate] : '点击选择'} onClick={this.remindTypeHandler} /> 
            </AtList>
            <View className='submit-btn'>
              <AtButton type='primary' formType='submit'>提交</AtButton>
            </View>  
          </AtForm>
        }
        <Layout title='日程类型' ref={node=>{this.scheduleTypeRef = node}} onClickLeft={this.onClickLeftHandler}>
          <AtRadio
            options={this.formatEnum(scheduleTypeEnum)}
            value={scheduleType}
            onClick={this.scheduleTypeChangeHandler}
          />
        </Layout>
        <Layout title='到期提醒' ref={node=>{this.remindTypeRef = node}} onClickLeft={this.onClickLeftHandler}>
          <AtRadio
            options={this.formatEnum(remindDateEnum)}
            value={remindDate}
            onClick={this.remindDateChangeHandler}
          />
        </Layout>
        <Layout title='关联事项' ref={node=>{this.relationMatterRef = node}} onClickLeft={this.onClickLeftHandler}>
          <RelationMatter defaultValue={{bindName,bindId,bindType}} onSure={this.onSureRelationMatterHandler} />
        </Layout>
        
      </View>
    )
  }
}
