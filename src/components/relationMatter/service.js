import Request from '@/utils/request'

//条件分页查询营销活动
export const actSearchByPage = data => Request({
  url: '/market/act/searchByPage',
  method: 'POST',
  data,
})


//商机分页
export const businessSearchByPage = data => Request({
  url: '/market/business/searchByPage',
  method: 'POST',
  data,
})

//行内客户
export const bankCustomerSearch = data => Request({
  url: '/customer/bankCustomer/search',
  method: 'POST',
  data,
})



