
import moment from 'moment'
export const formatDate = (date) => {
  return date?moment(date).format('YYYY-MM-DD HH:mm'):'--'
}


  //格式化枚举类型
export const formatEnum = (data) => {
  let arr = []
  for(var k in data){
    arr.push({
      label: data[k],
      value: k
    })
  }
  return arr
}

//获取数组中对象元素某个值
export const getTypeNames = (data, type) => {
  let arr = []
  data.forEach(item=>{
    arr.push(item[type])
  })
  return arr
}