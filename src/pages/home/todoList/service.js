import Request from '@/utils/request'

export const searchTaskReminds = data => Request({
  url: '/remind/searchTaskReminds',
  method: 'GET',
  data,
})
