import Taro, { Component } from '@tarojs/taro'
import { View, Radio, Label, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSearchBar, AtIcon, AtButton, AtTabs, AtTabsPane } from 'taro-ui'
import avatar from '@/images/avatar.png'
import Pagination from '@/components/pagination'
import PropTypes from 'prop-types'

import './index.scss'

@connect(({relationMatter}) => ({
  ...relationMatter,
}))
export default class Relationmatter extends Component {

  static propTypes  = {
    defaultValue: PropTypes.object,
    onSure: PropTypes.func,
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      value: '',
      scheduleBind: {
        bindId: [],
        bindName: [],
        bindType: [],  //1:营销活动2:商机3:客户
      },
      actLists: {
        content: []
      },
      businessLists: {
        content: []
      },
      bankCustomerLists: {
        content: []
      }
    }
    this.actPage = {
      page: 1,
      size: 10
    }
    this.businessPage = {
      page: 1,
      size: 10
    }
    this.customerPage = {
      page: 1,
      size: 10
    }
  }

  componentDidMount(){
    this.getActList()
  }

  componentWillReceiveProps({defaultValue, actList, businessList, bankCustomerList}){
    this.setState({
      scheduleBind: defaultValue
    })
    switch(this.state.current){
      case 0:
        let copyActListList = actList
        if(this.actPage.page !== 1){
          copyActListList = JSON.parse(JSON.stringify(this.state.actLists))
          copyActListList.content = copyActListList.content.concat(actList.content)
        }
        this.setState({
          actLists: copyActListList
        })
        break
      case 1:
        let copyBusinessListList = businessList
        if(this.businessPage.page !== 1){
          copyBusinessListList = JSON.parse(JSON.stringify(this.state.businessLists))
          copyBusinessListList.content = copyBusinessListList.content.concat(businessList.content)
        }
        this.setState({
          businessLists: copyBusinessListList
        })
        break
      case 2:
        let copyBankCustomerList = bankCustomerList
        if(this.customerPage.page !== 1){
          copyBankCustomerList = JSON.parse(JSON.stringify(this.state.bankCustomerLists))
          copyBankCustomerList.content = copyBankCustomerList.content.concat(bankCustomerList.content)
        }
        this.setState({
          bankCustomerLists: copyBankCustomerList
        })
        break
      case 3:
        break
    }
    
  }


  onChangeHandler = value => {
    this.setState({
      value
    })
  }

  onActionClickHandler = () => {
    switch(this.state.current){
      case 0:
        this.actPage.page = 1
        this.getActList()
        break
      case 1:
        this.businessPage.page = 1
        this.getBusinessList()
        break
      case 2:
        this.customerPage.page = 1
        this.getBankCustomerList()
        break
      case 3:
        break
    }
  }

  //获取营销任务列表
  getActList = () => {
    this.props.dispatch({
      type: 'relationMatter/actSearchByPage',
      data: {
        page: this.actPage,
        query: {
          actName: this.state.value,
        }
      }
    })
  }

  //获取商机列表
  getBusinessList = () => {
    this.props.dispatch({
      type: 'relationMatter/businessSearchByPage',
      data: {
        page: this.businessPage,
        query: {
          busInfo: this.state.value
        }
      }
    })
  }

  //获取客户列表
  getBankCustomerList = () => {
    this.props.dispatch({
      type: 'relationMatter/bankCustomerSearch',
      data: {
        page: this.customerPage,
        query: {
          name: this.state.value
        }
      }
    })
  }

  onTabChangeHandler = (value) => {
    this.setState({
      current: value,
      value: ''
    }, () => {
      switch(value){
        case 0:
          this.getActList()
          break
        case 1:
          this.getBusinessList()
          break
        case 2:
          this.getBankCustomerList()
          break
        case 3:
          break
      }
    })
    
    
  }

  actHandler = (data) => {
    const { id, actName } = data.marketActResp
    let a = JSON.parse(JSON.stringify(this.state.scheduleBind))
    if(a.bindId.includes(id)){
      let i = a.bindId.indexOf(id)
      a.bindId.splice(i,1)
      a.bindName.splice(i,1)
      a.bindType.splice(i,1)
    }else{
      a.bindId.push(id)
      a.bindName.push(actName)
      a.bindType.push(1)
    }
    this.setState({
      scheduleBind: a
    })
  }

  businessHandler = (data) => {
    const { id, name } = data
    let a = JSON.parse(JSON.stringify(this.state.scheduleBind))
    if(a.bindId.includes(id)){
      let i = a.bindId.indexOf(id)
      a.bindId.splice(i,1)
      a.bindName.splice(i,1)
      a.bindType.splice(i,1)
    }else{
      a.bindId.push(id)
      a.bindName.push(name)
      a.bindType.push(2)
    }
    this.setState({
      scheduleBind: a
    })
  }

  bankCustomerHandler = (data) => {
    const { no, name } = data
    let a = JSON.parse(JSON.stringify(this.state.scheduleBind))
    if(a.bindId.includes(Number(no))){
      let i = a.bindId.indexOf(Number(no))
      a.bindId.splice(i,1)
      a.bindName.splice(i,1)
      a.bindType.splice(i,1)
    }else{
      a.bindId.push(Number(no))
      a.bindName.push(name)
      a.bindType.push(3)
    }
    this.setState({
      scheduleBind: a
    })
  }

  onSearchHandler = () => {

  }

  onSureHandler = () => {
    const { scheduleBind } = this.state
    this.props.onSure(scheduleBind)
  }


  
  actListsPullHandler = () => {
    this.actPage.page++
    this.getActList()
  }

  businessListsPullHandler = () => {
    this.businessPage.page++
    this.getBusinessList()
  }

  //客户上拉加载更多
  bankCustomerPullHandler = () => {
    this.customerPage.page++
    this.getBankCustomerList()
  }


  render() {
    const { current, scheduleBind, actLists, businessLists, bankCustomerLists  } = this.state
    const tabList = [{ title: '营销任务' }, { title: '商机' }, { title: '客户' }, { title: '外勤' }]
    return (
      <View className='relationMatter-page'>
        <AtTabs current={current} scroll tabList={tabList} onClick={this.onTabChangeHandler}>
          <AtTabsPane current={current} index={0} >
            <AtSearchBar
              value={this.state.value}
              onChange={this.onChangeHandler}
              onActionClick={this.onActionClickHandler}
            />
            <View className='lists'>
              <Pagination totalCount={actLists.total} currentLen={actLists.content.length} onPull={this.actListsPullHandler}>
              {
                actLists.content.map(item=>{
                  return (
                    <Label key={item.marketActResp.id}>
                      <View className='list-box'>
                        <View className='title'>{item.marketActResp.actName}</View>
                        <View className='radio'>
                          <Radio checked={scheduleBind.bindId.includes(item.marketActResp.id)} onClick={()=>{this.actHandler(item)}} color='#e83820'></Radio>
                        </View>
                      </View>
                    </Label>
                  )
                })
              }
              </Pagination>
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <AtSearchBar
              value={this.state.value}
              onChange={this.onChangeHandler}
              onActionClick={this.onActionClickHandler}
            />
            <View className='lists'>
              <Pagination totalCount={businessLists.total} currentLen={businessLists.content.length} onPull={this.businessListsPullHandler}>
                {
                  businessLists.content.map(item=>{
                    return (
                      <Label key={item.id}>
                        <View className='list-box'>
                          <View className='title'>{item.name}</View>
                          <View className='radio'>
                            <Radio checked={scheduleBind.bindId.includes(item.id)} onClick={()=>{this.businessHandler(item)}} color='#e83820'></Radio>
                          </View>
                        </View>
                      </Label>
                    )
                  })
                }
              </Pagination>
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <AtSearchBar
              value={this.state.value}
              onChange={this.onChangeHandler}
              onActionClick={this.onActionClickHandler}
            />
            <View className='lists'>
              <Pagination totalCount={bankCustomerLists.total} currentLen={bankCustomerLists.content.length} onPull={this.bankCustomerPullHandler}>
              {
                bankCustomerLists.content.map(item=>{
                  return (
                    <Label key={item.id}>
                      <View className='person-list'>
                        <View className='item-container'>
                          <Image src={avatar} className='item-icon'></Image>
                          <View className='item-content'>
                            <View className='title'>{item.name}</View>
                            <View className='note'>ID：{item.no}</View>
                          </View>
                        </View>
                        <View className='item-extra'>
                          <Radio checked={scheduleBind.bindId.includes(Number(item.no))} onClick={()=>{this.bankCustomerHandler(item)}} color='#e83820'></Radio>
                        </View>
                      </View>
                    </Label>
                  )
                })
              }
              </Pagination>
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <AtSearchBar
              value={this.state.value}
              onChange={this.onChangeHandler}
              onActionClick={this.onActionClickHandler}
            />
            <View className='lists'>
              <Label>
                <View className='outwork-list' onClick={this.goDetailHandler}>
                  <View className='top'>
                    <View className='top-l'>
                      <View className='avatar'>
                        <AtIcon prefixClass='fa' value='iconavatar' size='40' color='#ccc'></AtIcon>
                      </View>
                      <View className='person'>周小明<Text className='role'>客户经理</Text></View>
                      <View className='time'>2019-08-23 22:31</View>
                    </View>
                    <View className='top-r'>工单签到</View>
                  </View>
                  <View className='middle'>
                    <AtIcon value='map-pin' size='15'></AtIcon><Text style='vertical-align: middle'>山西省长治市罗城区东大街235号</Text>
                  </View>
                  <View className='bottom'>
                    关联客户：张丽丽（cz00900)
                  </View>
                  <View className='item-extra'>
                    <Radio checked={false} color='#e83820'></Radio>
                  </View>
                </View>
              </Label>
            </View>
          </AtTabsPane>
        </AtTabs>
        <View className='sure'>
          <AtButton type='primary' onClick={this.onSureHandler}>确定</AtButton>
        </View>
      </View>
    )
  }
}
