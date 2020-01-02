import Request from '@/utils/request'


//创建跟进
export const createFollow = (data) => Request({
  url: '/customer/subCustomer/createFollow',
  method: 'POST',
  data
})


//获取跟进
export const getFollow = (data) => Request({
  url: '/customer/subCustomer/getFollow',
  method: 'GET',
  data
})

