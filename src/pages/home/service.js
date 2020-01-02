import Request from '@/utils/request'


//消息快照列表
export const searchSnList = data => Request({
  url: '/remind/searchSnList',
  method: 'GET',
  data,
})
