import Request from '@/utils/request'

export const allSchedule = data => Request({
  url: '/schedule/allSchedule',
  method: 'POST',
  data,
})
