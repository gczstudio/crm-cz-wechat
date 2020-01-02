import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import moment from 'moment'
import PropTypes from 'prop-types'

import './index.scss'

let years = [], months = [], days= [], hours = [], minutes =[]

function getDate(start, len, unit){
  let arr = []
  for(var i = start; i<= len; i++){
    arr.push(i+(unit||''))
  }
  return arr
}

function getTime(start, len){
  let arr = []
  for(var i = start; i< len; i++){
    if(i<10){
      arr.push('0'+i)
    }else {
      arr.push(i+'')
    }
  }
  arr.push('00')
  return arr
}

function isLeapYear(year){
  return (year%4==0&&year%100!=0)||year%400==0
}

function getSelectorValues(date){
 
  let year = moment(date).year()+'年'
  let month = moment(date).month()+1+'月'
  let day = moment(date).date()+'日'
  let hour = moment(date).hour()<10?'0'+moment().hour(): moment().hour()+''
  let minute = moment(date).minute()<10?'0'+moment().minute(): moment().minute()+''
  
  return [years.indexOf(year),months.indexOf(month),days.indexOf(day),hours.indexOf(hour),minutes.indexOf(minute)]

}

years = getDate(1997,  moment().year()+100, '年')
months = getDate(1, 12, '月')
days = getDate(1, 31, '日')
hours = getTime(1, 23)
minutes = getTime(1, 59)

export default class PickerTime extends Component {

  static propTypes  = {
    placehodler: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    placehodler: '请选择时间'
  }
  

  constructor () {
    super(...arguments)
    this.state = {
      multiSelector: [years,months,days,hours,minutes],
      mulitSelectorValues: getSelectorValues(moment()),
      selectorValue: '',
      currentYear:  moment().year(),
      currentMonth: moment().month()+1
    }
  }


 

  componentWillMount(){
    // this.setSelectorValue()
    if(this.props.defaultValue){
      console.log(this.props.defaultValue, 2222)
      this.setState({
        mulitSelectorValues: getSelectorValues(this.props.defaultValue),
        currentYear: this.props.defaultValue.split('-')[0],
        currentMonth: this.props.defaultValue.split('-')[1],
        selectorValue: this.props.defaultValue
      })
    }
  }

  setSelectorValue = () => {
    const { multiSelector, mulitSelectorValues } = this.state  
    let year = multiSelector[0][mulitSelectorValues[0]]
    let month = multiSelector[1][mulitSelectorValues[1]]
    let day = multiSelector[2][mulitSelectorValues[2]]
    let hour = multiSelector[3][mulitSelectorValues[3]]
    let minute = multiSelector[4][mulitSelectorValues[4]]
    this.setState({
      selectorValue: moment(`${year.slice(0,year.length-1)}-${month.slice(0,month.length-1)}-${day.slice(0,day.length-1)} ${hour}:${minute}`).format('YYYY-MM-DD HH:mm')
    }, () => {
      this.props.onChange&&this.props.onChange(this.state.selectorValue)
    })
  }

  columnChange = (e) => {
    const { multiSelector, currentYear, currentMonth } = this.state
    const days_31 = [1,3,5,7,8,10,12]
    const column = e.detail.column
    const value = e.detail.value
    let copyMultiSelector = this.state.multiSelector
    if(column == 0){
      this.setState({
        currentYear: parseFloat(multiSelector[0][value])
      })
    }
    
    if(column == 0&&currentMonth==2){
      let year = parseFloat(multiSelector[0][value])
      if(isLeapYear(year)){
        copyMultiSelector[2] =  days.slice(0,29)
      }else{
        copyMultiSelector[2] =  days.slice(0,28)
      }
    }
    if(column == 1){
      this.setState({
        currentMonth: parseFloat(multiSelector[1][value])
      })
      if(days_31.includes(Number(value)+1)){
        copyMultiSelector[2] = days
      } else if(value==1){
        let year = currentYear
        if(isLeapYear(year)){
          copyMultiSelector[2] =  days.slice(0,29)
        }else{
          copyMultiSelector[2] =  days.slice(0,28)
        }
      }else{
        copyMultiSelector[2] = days.slice(0,30)
      }
    }
    this.setState({
      multiSelector: copyMultiSelector
    })

  }

  handleMulitChange = e => {
    this.setState({
      mulitSelectorValues: e.detail.value
    },()=>{
      this.setSelectorValue()
    })
    
  }

  render() {
    const { multiSelector, mulitSelectorValues, selectorValue } = this.state
    const { placehodler } = this.props
    return (
      <View className='pickerTime-page'>
  
        <Picker mode='multiSelector' range={multiSelector} value={mulitSelectorValues} onChange={this.handleMulitChange} onColumnChange={this.columnChange}>
          
            <View className='demo-list-item__value'>{selectorValue || placehodler}</View>

        </Picker>
            
      </View>
    )
  }
}
