import Request from '@/utils/request'

//角色切换
export const confirmIdentity = data => Request({
  url: '/auth/login/confirmIdentity',
  method: 'GET',
  data,
})

//退出登录
export const logout = data => Request({
  url: '/auth/login/logout',
  method: 'POST',
  data,
})

