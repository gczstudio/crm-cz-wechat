import Request from '@/utils/request'

export const create = data => Request({
  url: '/market/business/create',
  method: 'POST',
  data,
})

export const update = data => Request({
  url: `/market/business/update?busId=${data.busId}`,
  method: 'POST',
  data,
})



export const businessSearchById = data => Request({
  url: '/market/business/searchById?id='+data.id,
  method: 'POST'
})