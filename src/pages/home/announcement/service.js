import Request from '@/utils/request'

export const searchReceiveAnnouncement = data => Request({
  url: '/Announcement/searchReceiveAnnouncement',
  method: 'POST',
  data,
})
