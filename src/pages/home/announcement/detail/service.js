import Request from '@/utils/request'

export const announcementDetail = data => Request({
  url: '/Announcement/announcementDetail',
  method: 'GET',
  data,
})


export const batchGetFile = data => Request({
  url: '/common/file/batchGetFile',
  method: 'GET',
  data,
})


//发布评论
export const saveReplyComment = data => Request({
  url: '/Announcement/saveReplyComment',
  method: 'POST',
  data,
})


//回复评论
export const reportReplyComment = data => Request({
  url: '/Announcement/reportReplyComment?replyCommentId='+data.replyCommentId,
  method: 'POST',
  data,
})




