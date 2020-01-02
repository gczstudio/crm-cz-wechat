import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSegmentedControl, AtSearchBar } from 'taro-ui'
import Header from '@/components/header'
import Pagination from '@/components/pagination'
import List from './list'

import './index.scss'

@connect(({customer}) => ({
  ...customer,
}))
export default class Customer extends Component {
  

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      current: 0,
      customerLists: {
        content: []
      }
    }
    this.customerPage = {
      page: 1,
      size: 10
    }
  }

  componentDidMount(){
    let homeSearch = Taro.getStorageSync('homeSearch')
    if(homeSearch){
      this.setState({
        value: homeSearch
      },()=>{
        this.getCustomerList(0)
      })
    } else {
      this.getCustomerList(0)
    }
    
  }

  componentWillReceiveProps({customerList}){

    let copyCustomerList = customerList
    if(this.customerPage.page !== 1){
      copyCustomerList = JSON.parse(JSON.stringify(this.state.customerLists))
      copyCustomerList.content = copyCustomerList.content.concat(customerList.content)
    }
    this.setState({
      customerLists: copyCustomerList
    })
  }

  componentDidHide(){
    Taro.removeStorageSync('homeSearch')
  }

  onChangeHandler = (value) => {
    this.setState({
      value
    })
  }

  onActionClickHandler = () => {
    this.customerPage.page = 1
    this.getCustomerList(this.state.current)
  }

  handleClick = value => {
    this.setState({
      current: value,
      value: ''
    })
    this.customerPage.page = 1
    this.getCustomerList(value)
  }

  getCustomerList = (current) => {
    switch(current){
      case 0:
        this.getBankCustomerTable()
        break
      case 1:
        this.getSubCustomerList()
        break
      case 2:
        this.getBankCustomerAllList()
        break
    }
  }

  //获取管户客户
  getBankCustomerTable = () => {
    this.props.dispatch({
      type: 'customer/bankCustomerTable',
      data: {
        page: this.customerPage,
        query: {
          customerInfo: this.state.value
        }
      }
    })
  }

  //获取潜在客户
  getSubCustomerList = () => {
    this.props.dispatch({
      type: 'customer/subCustomerSearch',
      data: {
        page: this.customerPage,
        query: {
          customerName: this.state.value
        }
      }
    })
  }

  //获取全行客户
  getBankCustomerAllList = () => {
    this.props.dispatch({
      type: 'customer/bankCustomerSearchAll',
      data: {
        page: this.customerPage,
        query: {
          name: this.state.value
        }
      }
    })
  }

  customerListsPullHandler = () => {
    this.customerPage.page++
    this.getCustomerList(this.state.current)
  }


  render() {
    const  { current, value, customerLists } = this.state
    return (
      <View className='customer-page'>
        <Header title='客户管理' showLeft={false} fixed />
        <View className='customer-header'>
          <View className='tab'>
            <AtSegmentedControl
              values={['管户客户', '潜在客户', '全行客户']}
              onClick={this.handleClick}
              current={current}
            />
          </View>
          <AtSearchBar
            value={value}
            onChange={this.onChangeHandler}
            onActionClick={this.onActionClickHandler}
          />
        </View>
        <Pagination totalCount={customerLists.total} currentLen={customerLists.content.length} onPull={this.customerListsPullHandler}>
          {
            this.state.current === 0
            ? <View className='tab-content'><List type='manager' dataList={customerLists.content} /></View>
            : null
          }
          {
            this.state.current === 1
            ? <View className='tab-content'><List type='latent' dataList={customerLists.content} /></View>
            : null
          }
          {
            this.state.current === 2
            ? <View className='tab-content'><List type='allBank' dataList={customerLists.content} /></View>
            : null
          }
        </Pagination>
      </View>
    )
  }
}
