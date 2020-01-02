import Taro, { Component } from '@tarojs/taro'
import { View, Radio, Label, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSearchBar, AtList, AtListItem, AtIcon } from 'taro-ui'

import './index.scss'

@connect(({orgTree}) => ({
  ...orgTree,
}))
export default class Orgtree extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      breadCrumbs: [],
      selectItems: [],
      selectIds: [],
      selectNames: [],
      headIconIds: []
    }
  }

  componentWillMount = () => {
    this.getOrgTree('',(data)=>{
      this.setState({
        breadCrumbs: [data]
      })
    })
  }


  getOrgTree = (orgNo, callback) => {
    this.props.dispatch({
      type: 'orgTree/getOrgTree',
      data: {
        data: {
          orgNo: orgNo || ''
        },
        callback
      }
    })
  }

  orgClickHandler = (data) => {
    this.getOrgTree(data.no)
    let c = JSON.parse(JSON.stringify(this.state.breadCrumbs))
    c.push(data)
    this.setState({
      breadCrumbs: c
    })
  }

  onBreadCrumbsHandler = (data, index) => {
    this.getOrgTree(data.no)
    let c = JSON.parse(JSON.stringify(this.state.breadCrumbs))
    this.setState({
      breadCrumbs: c.slice(0,index+1)
    })
  }

  onSelectPersonHandler = (item,onlyCancle) => {
    let p = JSON.parse(JSON.stringify(this.state.selectIds))
    let s = JSON.parse(JSON.stringify(this.state.selectItems))
    let n = JSON.parse(JSON.stringify(this.state.selectNames))
    let h = JSON.parse(JSON.stringify(this.state.headIconIds))
    let id = String(item.id)
    if(p.includes(id)){
      let i = p.indexOf(id)
      p.splice(i,1)
      s.splice(i,1)
      h.splice(i,1)
      n.splice(i,1)
    }else if(!onlyCancle){
      p.push(id)
      s.push(item)
      h.push(item.headIconId)
      n.push(item.userName)
    }
    this.setState({
      selectIds: p,
      selectItems: s,
      headIconIds: h,
      selectNames: n,
    })
  }

  getHeadIcons = () => {
    this.props.dispatch({
      type: 'orgTree/download',
      data: {
        id: this.state.headIconIds[0]
      }
    })
  }

  onChangeHandler = (value) => {
    this.setState({
      value
    })
  }

  onSearchHandler = () => {
    this.getOrgTree(this.state.value)
  }


  onSureHandler = () => {
    const { selectItems, selectIds, selectNames } = this.state
    this.props.onSure && this.props.onSure({
      selectItems,
      selectIds,
      selectNames,
    })
  }

  render() {
    const { breadCrumbs, selectIds, selectItems } = this.state
    const { orgTreeData } = this.props
    return (
      <View className='orgTree-page'>
        <View className='orgTree-header'>
          <AtSearchBar
            value={this.state.value}
            onChange={this.onChangeHandler}
            onActionClick={this.onSearchHandler}
          />
          <View className='bread-crumb'>
            {
              breadCrumbs.length>0&&breadCrumbs.map((item, index)=>{
                return (
                <View key={item.no} className='bread-crumb-item' onClick={()=>this.onBreadCrumbsHandler(item, index)}>
                  <Text>{item.name}</Text>
                  {
                    index == breadCrumbs.length-1?'':<AtIcon value='chevron-right' size='15' color='#ccc'></AtIcon>
                  }
                </View>)
              })
            }
          </View>
        </View>
        <AtList>
          {
            orgTreeData.childList&&orgTreeData.childList.map(item=>{
              return (
              <AtListItem
                key={item.no}
                title={item.name}
                arrow='right'
                iconInfo={{ size: 40, prefixClass:'fa', value:'iconorg', color:'#ccc' }}
                onClick={()=>{this.orgClickHandler(item)}}
              />)
            })
          }
        </AtList>
        {
          orgTreeData.identityUserList&&orgTreeData.identityUserList.map(item=>{
            return (
              <Label key={item.id} onClick={()=>{this.onSelectPersonHandler(item)}}>
                <View className='person-list'>
                  <View className='item-container'>
                    <View className='item-icon'>
                      <AtIcon prefixClass='fa' value='iconavatar' size='40' color='#ccc'></AtIcon>
                    </View>
                    <View className='item-content'>
                      <View className='title'>{item.userName}</View>
                      <View className='note'>{item.roleName}</View>
                    </View>
                  </View>
                  <View className='item-extra'>
                    <Radio checked={selectIds.includes(String(item.id))}></Radio>
                  </View>
                </View>
              </Label>
            )
          })
        }
        <View className='has-select'>
            <View className='user-list'>
              {
                selectItems.map(item=>{
                  return(
                    <View className='user' key={item.id}>
                      <View className='has-icon'>
                        <AtIcon prefixClass='fa' value='iconavatar' size='40' color='#ccc'></AtIcon>
                      </View>
                      <View className='userName'>{item.userName}</View>
                      <View className='icon-close' onClick={()=>{this.onSelectPersonHandler(item,'cancle')}}>
                        <AtIcon value='close-circle' size='20' color='#ff4949'></AtIcon>
                      </View>
                    </View>
                  )
                })
              }
              
            </View>
            <View className='sure' onClick={this.onSureHandler}>确定({selectItems.length})</View>
        </View>
      </View>
    )
  }
}
