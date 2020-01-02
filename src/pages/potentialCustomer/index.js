import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtForm, AtInput, AtButton, AtList, AtListItem, AtTextarea, AtRadio } from 'taro-ui'
import Header from '@/components/header'
import Layout from '@/components/layout'
import { idTypeEnum } from '@/utils/enum'
import { formatEnum } from '@/utils/index'

import './index.scss'

@connect(({potentialCustomer}) => ({
  ...potentialCustomer
}))
export default class PotentialCustomer extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      address: "",
      contact: "",
      idNo: "",
      idType: "",
      name: "",
      remark: ""
    }
  }

  nameChangeHandler = (value) => {
    this.setState({
      name: value
    })
  }

  idTypeChangeHandler = (value) => {
    this.setState({
      idType: value
    })
  }

  contactChangeHandler = (value) => {
    this.setState({
      contact: value
    })
  }

  idNoChangeHandler = (value) => {
    this.setState({
      idNo: value
    })
  }


  addressChangeHandler = (value) => {
    this.setState({
      address: value
    })
  }

  remarkChangeHandler = (e) => {
    this.setState({
      remark: e.detail.value
    })
  }

  onSubmit = () => {
    this.props.dispatch({
      type: 'potentialCustomer/create',
      data: {
        data: this.state,
        callback: () => {
          Taro.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 2000
          }).then(() => {
            Taro.switchTab({
              url: '/pages/customer/index'
            })
          })
        }
      }
    })
  }


  render() {
    const { idType, name, address, contact, idNo, remark } = this.state
    return (
      <View className='potentialCustomer-page'>
        <Header title='添加潜客' showLeft={false} fixed />
        <AtForm
          onSubmit={this.onSubmit}
        >
          <View className='title'>
            <AtList>
              <AtInput 
                name='value' 
                type='text' 
                border={false}
                placeholder='输入客户姓名' 
                value={name} 
                onChange={this.nameChangeHandler} 
              />
            </AtList>
          </View>
          <AtList>
            <AtListItem title='基础信息' />
            <AtInput 
              name='value' 
              type='text' 
              title='联系方式'
              placeholder='点击填写' 
              value={contact} 
              onChange={this.contactChangeHandler} 
            />
            <Layout title='证件类型' ref={node=>{this.scheduleTypeRef = node}}>
              <AtRadio
                options={formatEnum(idTypeEnum)}
                value={idType}
                onClick={this.idTypeChangeHandler}
              />
            </Layout>
            <AtInput 
              name='value' 
              type='text' 
              title='证件号码'
              placeholder='点击填写' 
              value={idNo} 
              onChange={this.idNoChangeHandler} 
            />
            <AtInput 
              name='value' 
              type='text' 
              title='家庭住址'
              placeholder='请输入' 
              value={address} 
              onChange={this.addressChangeHandler} 
            />
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
      </View>
    )
  }
}
