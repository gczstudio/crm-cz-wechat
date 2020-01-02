import Request from '@/utils/request'


//客户详情
export const getCustomerDetailDoc = data => Request({
  url: '/customer/detail/getCustomerDetailDoc?customerNo='+data.customerNo,
  method: 'POST',
  data:{}
})


//获取客户基本信息
export const getCustomerInfoBasicDoc = data => Request({
  url: '/customer/detail/getCustomerInfoBasicDoc?customerNo='+data.customerNo,
  method: 'POST',
  data:{}
})


//编号查询客户
export const findByNo = data => Request({
  url: '/customer/bankCustomer/findByNo',
  method: 'GET',
  data
})



//获取时间偏好
export const getContactTime = data => Request({
  url: '/customer/detail/getContactTime',
  method: 'GET',
  data
})




//签约产品
export const getCustomerHoldProductDoc = data => Request({
  url: '/customer/detail/getCustomerHoldProductDoc',
  method: 'GET',
  data
})


//客户标签（行内客户）
export const getCustomerTag = data => Request({
  url: '/customer/bankCustomer/customerTag?customerNo='+data.customerNo,
  method: 'POST',
  data:{}
})



