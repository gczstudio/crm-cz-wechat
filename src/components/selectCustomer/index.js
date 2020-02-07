import Taro, { Component } from '@tarojs/taro'
import { View, Radio, Label } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSearchBar, AtButton } from 'taro-ui'
import PropTypes from 'prop-types'
import Pagination from '@/components/pagination'
import { getTypeNames } from '@/utils/index'
import './index.scss'

@connect(({selectCustomer}) => ({
  ...selectCustomer
}))
export default class Selectcustomer extends Component {
  static propTypes  = {
    defaultValue: PropTypes.array,
    onSure:PropTypes.func,
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      bankCustomerLists: {
        content: []
      },
      backCustomer: {
        names: [],
        ids: [],
        items: []
      }
    }

    this.customerPage = {
      page: 1,
      size: 10
    }
  }


  componentDidMount() {
    this.props.onRef(this)

  }

  componentWillReceiveProps({defaultValue, bankCustomerList}){
    this.setState({
      backCustomer: {
        names: getTypeNames(defaultValue,'custName'),
        ids: getTypeNames(defaultValue,'custNo'),
        items: defaultValue
      }
    })
    let copyBankCustomerList = bankCustomerList
    if(this.customerPage.page !== 1){
      copyBankCustomerList = JSON.parse(JSON.stringify(this.state.bankCustomerLists))
      copyBankCustomerList.content = copyBankCustomerList.content.concat(bankCustomerList.content)
    }
    this.setState({
      bankCustomerLists: copyBankCustomerList
    })
  }


  onChangeHandler = value => {
    this.setState({
      value
    })
  }

  onActionClickHandler = () => {
    this.customerPage.page = 1
    this.getBankCustomerList()
  }


  //获取客户列表
  getBankCustomerList = () => {
    this.props.dispatch({
      type: 'selectCustomer/bankCustomerSearch',
      data: {
        page: this.customerPage,
        query: {
          name: this.state.value
        }
      }
    })
  }

  //客户上拉加载更多
  bankCustomerPullHandler = () => {
    this.customerPage.page++
    this.getBankCustomerList()
  }

  onChange = () => {
    
  }

  selectCustomerHandler = (data) => {
    const { no, name } = data
    let a = JSON.parse(JSON.stringify(this.state.backCustomer))
    if(a.ids.includes(no)){
      let i = a.ids.indexOf(no)
      a.ids.splice(i,1)
      a.names.splice(i,1)
      a.items.splice(i,1)
    }else{
      a.ids.push(no)
      a.names.push(name)
      a.items.push(data)
    }
    this.setState({
      backCustomer: a
    })
  }

  onSureHandler = () => {
    let result = []
    this.state.backCustomer.items.forEach(item=>{
      result.push({
        custName: item.custName || item.name,
        custNo: item.custNo || item.no,
        custType: 'BANK_CUST'
      })
    })
    this.props.onSure&&this.props.onSure(result)
  }

  render() {
    const { bankCustomerLists, backCustomer } = this.state
    return (
      <View className='selectCustomer-page'>
        <View className='search-box'>
          <AtSearchBar
            value={this.state.value}
            onChange={this.onChangeHandler}
            onActionClick={this.onActionClickHandler}
            placeholder='客户姓名'
          />
        </View>
        <View className='list'>
          <Pagination totalCount={bankCustomerLists.total} currentLen={bankCustomerLists.content.length} onPull={this.bankCustomerPullHandler}>
            { 
              bankCustomerLists.content.map(item=>{
                return (
                  <Label key={item.id}>
                    <View className='list-item'>
                      <View className='item-l'>
                        <View className='title'>{item.name}（{item.no})</View>
                        <View>客户等级：{item.level}</View>
                        <View>时点储蓄余额：{item.totalBalance}元</View>
                      </View>
                      <View className='item-r'>
                        <Radio color='#e83820' checked={backCustomer.ids.includes(item.no)} onClick={()=>{this.selectCustomerHandler(item)}}></Radio>
                      </View>
                    </View>
                  </Label>
                )
              })
            }
          </Pagination> 
        </View>
        <View className='sure'>
          <AtButton type='primary' onClick={this.onSureHandler}>确定</AtButton>
        </View>
      </View>
    )
  }
}
