import Request from '@/utils/request'

//新建日程
export const create = data => Request({
  url: '/schedule/create',
  method: 'POST',
  data
})

//日程详情
export const scheduleDetail = data => Request({
  url: '/schedule/scheduleDetail',
  method: 'GET',
  data
})


//删除日程
export const removeSchedule = data => Request({
  url: '/schedule/removeSchedule',
  method: 'GET',
  data
})

//编辑日程
export const update = data => Request({
  url: '/schedule/update',
  method: 'POST',
  data
})





