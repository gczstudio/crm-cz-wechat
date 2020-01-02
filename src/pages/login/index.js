import Taro, { Component } from '@tarojs/taro'
import { View, CoverImage, Input, Image  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import loginBg from '@/images/bg.png'
import logo from '@/images/logo.png'
import title from '@/images/title.png'
import userIcon from '@/images/user-icon.png'
import pwdIcon from '@/images/pwd-icon.png'
import { AtButton } from 'taro-ui'
import Header from '@/components/header'
import './index.scss'

@connect(({login}) => ({
  ...login,
}))
export default class Login extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      userName: '',
      password: '',
      loginDisabled: true
    }
  }

  userNameChangeHandler = (e) => {
    this.setState({
      userName: e.detail.value,
      loginDisabled: !(e.detail.value && this.state.password)
    })
  }


  pwdChangeHandler = (e) => {
    this.setState({
      password: e.detail.value,
      loginDisabled: !(e.detail.value && this.state.userName)
    })
  }


  loginHandler = () => {
    const { userName, password } = this.state
    this.props.dispatch({
      type: 'login/login',
      data: {
       data:{
        user: userName,
        password
       },
       callback: (data)=>{
        Taro.setStorageSync('roleInfo',data)
        Taro.navigateTo({
          url: '/pages/login/confirmRole/index'
        })
       }
      },
    })
  }

  render() {
    const { userName, password, loginDisabled } = this.state
    return (
      <View className='login-page'>
        <Image src='http://192.168.1.74:8080/crm/common/file/download?id=a87f8b90-509d-48ca-aed7-5f32cb9b5834'></Image>
        <Header isBlank />
        <View className='login-bg'>
          <Image src={loginBg} style='width: 100%;height:100%;'></Image>
        </View>
        <View className='login-logo'>
          <CoverImage src={logo}></CoverImage>
        </View>
        <View className='login-title'>
          <CoverImage src={title}></CoverImage>
        </View>
        <View className='login-box'>
          <View className='form-item'>
            <Image src={userIcon} className='icon'></Image><Input type='text' placeholder='登录账号' value={userName} onInput={this.userNameChangeHandler} />
          </View>
          <View className='form-item'>
          <Image src={pwdIcon} className='icon'></Image><Input type='password' placeholder='登录密码' value={password} onInput={this.pwdChangeHandler} />
          </View>
          <View className='login-btn'>
            <AtButton type='primary' disabled={loginDisabled} onClick={this.loginHandler}>登录</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
