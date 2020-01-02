import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtForm, AtButton, AtList, AtListItem, AtTextarea, AtRadio } from 'taro-ui'
import Header from '@/components/header'
import Layout from '@/components/layout'
import { formatEnum } from '@/utils/index'
import { followStatusEnum, landBusEnum } from '@/utils/enum'
import './index.scss'

@connect(({customerFollow}) => ({
  ...customerFollow
}))
export default class Follow extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      busStatus: '',
      // landBus: '',
      remark: ''
    }
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'customerFollow/getFollow',
      data: {
        subCustomerId: this.$router.params.id
      }
    })
  }

  componentWillReceiveProps({followList}){
    this.setState({
      busStatus: this.sortFollowList(followList)[0].followState,
      remark: this.sortFollowList(followList)[0].remark
    })
  }

  sortFollowList = (data) => {
     data.sort((a, b)=>{
       return b.createDate - a.createDate
     })
     return data
  }

  remarkChangeHandler = (e) => {
    console.log(e, 111)
    this.setState({
      remark: e.detail.value
    })
  }

  busStatusHandler = () => {
    this.busStatusRef.show()
  }

  landBusHandler = () => {
    this.landBusRef.show()
  }

  busStatusChangeHandler = (value) => {
    this.setState({
      busStatus: value
    })
    this.busStatusRef.hide()
  }

  // landBusChangeHandler = (value) => {
  //   this.setState({
  //     landBus: value
  //   })
  //   this.landBusRef.hide()
  // }


  onSubmit = () => {
    const { busStatus, remark } = this.state
    const id = this.$router.params.id
    this.props.dispatch({
      type: 'customerFollow/createFollow',
      data: {
        data: {
          subCustomerId: id,
          followState: busStatus,
          remark
        },
        callback: ()=>{
          Taro.showToast({
            title: '跟进成功',
            icon: 'success',
            duration: 2000
          }).then(() => {
            Taro.navigateBack({
              delta: 1
            })
          })
        }
      }
    })


  }



  render() {
    const { busStatus, remark } = this.state
    return (
      <View className='follow-page'>
        <Header title='客户跟进' showLeft fixed />
        <AtForm
          onSubmit={this.onSubmit}
        >
          <AtList>
            <AtListItem title='跟进状态' arrow='right'  extraText={followStatusEnum[busStatus] || '点击选择'} onClick={this.busStatusHandler} />
          {/*busStatus == 'NOT_TOUCH' ? '': <AtListItem title='落地业务' arrow='right'  extraText={landBusEnum[landBus] || '点击选择'} onClick={this.landBusHandler} />*/}
          </AtList>
          <View style='margin: 20px 0'>
            <AtList>
              <AtListItem title='备注信息' />
              <AtTextarea
                value={remark}
                onChange={this.remarkChangeHandler}
                count={false}
                placeholder='请输入备注信息'
              />
            </AtList>
          </View>
          <View className='submit-btn'>
            <AtButton type='primary' formType='submit'>提交</AtButton>
          </View>
        </AtForm>
        <Layout title='跟进状态' ref={node=>{this.busStatusRef = node}}>
          <AtRadio
            options={formatEnum(followStatusEnum)}
            value={busStatus}
            onClick={this.busStatusChangeHandler}
          />
        </Layout>
        {/*<Layout title='落地业务' ref={node=>{this.landBusRef = node}}>
          <AtRadio
            options={formatEnum(landBusEnum)}
            value={landBus}
            onClick={this.landBusChangeHandler}
          />
        </Layout>*/}
      </View>
    )
  }
}
