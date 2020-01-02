import Request from '@/utils/request'

//获取带身份机构树
export const getOrgTree = data => Request({
  url: '/org/getOrgTreeRespWithUserByRootNo',
  method: 'GET',
  data,
})

//下载文件信息
export const download = data => Request({
  url: '/common/file/download',
  method: 'GET',
  data,
})

