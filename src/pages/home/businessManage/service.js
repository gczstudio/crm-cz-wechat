import Request from '@/utils/request'

export const businessSearchByPage = data => Request({
  url: '/market/business/searchByPage',
  method: 'POST',
  data,
})
