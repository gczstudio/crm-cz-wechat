import Request from '@/utils/request'

//登录
export const login = data => Request({
  url: '/auth/login/loginUnsafe',
  method: 'POST',
  data,
})





