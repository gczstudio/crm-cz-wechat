import Request from '@/utils/request'

export const businessSearchById = data => Request({
  url: '/market/business/searchById?id='+data.id,
  method: 'POST'
})

//商机跟进历史分页
export const searchLogPage = data => Request({
  url: '/market/business/searchLogPage',
  method: 'POST',
  data
})


