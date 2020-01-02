import Request from '@/utils/request'

export const myDaySchedule = data => Request({
  url: '/schedule/MyDaySchedule',
  method: 'POST',
  data,
})

//查询全部日程

export const allSchedule = data => Request({
  url: '/schedule/allSchedule',
  method: 'POST',
  data,
})


