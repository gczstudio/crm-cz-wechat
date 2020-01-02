import Request from '@/utils/request'

export const create = data => Request({
  url: '/customer/subCustomer/create',
  method: 'POST',
  data,
})
