import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import address from '@/utils/city_code'

import './index.scss'

@connect(({area}) => ({
  ...area,
}))
export default class Area extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      province: '',
      city: '',
      area: '',
      pickerShow: false,
      value: [0, 0, 0],
      provinces: address,
      citys: address[0].city,
      areas: address[0].city[0].area,
      ranges: [[], [], []],
    }
  }

  componentDidShow() {
    this.cityChange()
  }

  columnChange = (e) => {
    const { provinces, citys, value } = this.state
    const column = e.detail.column
    const evalue = e.detail.value
    let provinceNum = value[0]
    let cityNum = value[1]
    let countyNum = value[2]
    console.log(address)
    console.log(provinces)
    if (column == 0) {
      provinceNum = evalue
      this.setState({
        value: [provinceNum, 0, 0],
        citys: provinces[provinceNum].city,
        areas: provinces[provinceNum].city[0].area
      }, () => {
        this.cityChange()
      })
    } else if (column == 1) {
      cityNum = evalue
      this.setState({
        value: [provinceNum, cityNum, 0],
        areas: citys[cityNum].area
      }, () => {
        this.cityChange()
      })
    } else {
      // 滑动选择了区
      countyNum = evalue
      this.setState({
        value: [provinceNum, cityNum, countyNum]
      }, () => {
        this.cityChange()
      })
    }
  }
  cityChange = () => {
    const { provinces, citys, areas } = this.state
    let ranges = [[], [], []]
    for (let i = 0; i < provinces.length; i++) {
      ranges[0].push(provinces[i].name)
    }
    for (let i = 0; i < citys.length; i++) {
      ranges[1].push(citys[i].name)
    }
    for (let i = 0; i < areas.length; i++) {
      ranges[2].push(areas[i].name)
    }
    this.setState({
      ranges: ranges,
    })
  }
  //  params true代表传递地址，false不传递
  handlePickerShow = () => {
    const { provinces, citys, areas, value } = this.state
    const p = provinces[value[0]].name
    const c = citys[value[1]].name
    const a = areas[value[2]].name
    this.setState({
      pickerShow: !this.state.pickerShow,
      province: p || '',
      city: c || '',
      area: a || '',
    })
  }


  render() {
    return (
      <View className='area-page'>
        <Picker mode='multiSelector' range={this.state.ranges} onChange={this.handlePickerShow} onColumnChange={this.columnChange}>
          <View>
            {this.state.province && <View>{this.state.province} {this.state.city} {this.state.area}</View>}
            {!this.state.province && <View>请选择地区</View>}
          </View>
        </Picker>
      </View>
    )
  }
}
