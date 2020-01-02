import Request from '@/utils/request'

//确认身份
export const confirmIdentity = data => Request({
  url: '/auth/login/confirmIdentity',
  method: 'GET',
  data,
})
