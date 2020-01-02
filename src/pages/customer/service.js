import Request from '@/utils/request'



//搜索管户客户

export const bankCustomerTable = data => Request({
  url: '/ultimate/bankCustomer/bankCustomerTable',
  method: 'POST',
  data,
})


//搜索行内客户
export const bankCustomerSearch = data => Request({
  url: '/customer/bankCustomer/search',
  method: 'POST',
  data,
})

//搜索行内全部客户
export const bankCustomerSearchAll = data => Request({
  url: '/customer/bankCustomer/searchAll',
  method: 'POST',
  data,
})


//搜索潜在客户
export const subCustomerSearch = data => Request({
  url: '/customer/subCustomer/search',
  method: 'POST',
  data,
})
