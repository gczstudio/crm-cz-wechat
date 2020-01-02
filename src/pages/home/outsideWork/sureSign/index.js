import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtForm, AtInput, AtButton, AtList, AtListItem, AtTextarea } from 'taro-ui'


import './index.scss'

@connect(({sureSign}) => ({
  ...sureSign
}))
export default class SureSign extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
    }
  }

  config = {
    navigationBarTitleText: '确认签到',
  }

  componentDidMount = () => {

  }


  handleChange (value) {
    this.setState({
      value
    })
  }
  onSubmit = () => {
    console.log(this.state.value)
  }

  scheduleTypeHandler = () => {
    Taro.navigateTo({
      url: `/pages/home/scheduleManage/sureSign/scheduleType/index?type=${this.props.scheduleType}`
    })
  }

  remindTypeHandler = () => {
    Taro.navigateTo({
      url: `/pages/home/scheduleManage/sureSign/remind/index?type=${this.props.remindType}`
    })
  }

  startTimeChangeHandler = () => {}

  render() {

    return (
      <View className='sureSign-page'>
        <AtForm
          onSubmit={this.onSubmit}
          onReset={this.onReset}
        >
          <AtList>
            <AtListItem title='签到时间' extraText='2019-08-15 12:00:01' />
            <AtListItem title='签到地点' extraText='山西省长治市罗城区东大街456号'  />
            <AtListItem title='关联事项' arrow='right'  extraText='点击选择' onClick={this.handleClick} />
            <AtInput 
              name='value' 
              type='text' 
              title='外勤名称'
              placeholder='请输入' 
              value={this.state.value} 
              onChange={()=>{this.handleChange}} 
            />
          </AtList>
          <AtListItem title='汇报对象' arrow='right'  extraText='点击选择' onClick={this.handleClick} />
          <AtListItem title='抄送对象' arrow='right'  extraText='点击选择' onClick={this.handleClick} />
          <View style='margin: 20px 0'>
            <AtList>
              <AtListItem title='外勤描述' />
              <AtTextarea
                value={this.state.value}
                onChange={()=>{this.handleChange}}
                maxLength={200}
                placeholder='请输入描述信息'
              />
            </AtList>
          </View>
          <View className='submit-btn'>
            <AtButton type='primary' formType='submit'>提交</AtButton>
          </View>
        </AtForm>
      </View>
    )
  }
}
