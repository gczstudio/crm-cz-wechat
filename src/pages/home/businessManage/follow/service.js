import Request from '@/utils/request'

export const updateBus = (data) => Request({
  url: '/market/business/updateBus?id='+data.id,
  method: 'POST',
  data: {
    status:data.status,
    landBus:data.landBus,
    remark:data.remark
  },
})
