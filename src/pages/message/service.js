import Request from '@/utils/request'

export const searchSnList = data => Request({
  url: '/remind/searchSnList',
  method: 'GET',
  data,
})
