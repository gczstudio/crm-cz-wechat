import Request from '@/utils/request'

//行内客户
export const bankCustomerSearch = data => Request({
  url: '/customer/bankCustomer/search',
  method: 'POST',
  data,
})
