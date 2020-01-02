import common from './common'
import home from '../pages/home/model'
import todoList from '../pages/home/todoList/model'
import todoDetail from '../pages/home/todoList/detail/model'
import todaySchedule from '../pages/home/todaySchedule/model'
import scheduleManage from '../pages/home/scheduleManage/model'
import orgTree from '../components/orgTree/model'
import createSchedule from '../pages/home/scheduleManage/createSchedule/model'
import createBusiness from '../pages/home/businessManage/create/model'
import mine from '../pages/mine/model'
import login from '../pages/login/model'
import confirmRole from '../pages/login/confirmRole/model'
import relationMatter from '../components/relationMatter/model'
import businessManage from '../pages/home/businessManage/model'
import businessDetail from '../pages/home/businessManage/detail/model'
import businessFollow from '../pages/home/businessManage/follow/model'
import relationSchedule from '../components/relationSchedule/model'
import selectCustomer from '../components/selectCustomer/model'
import announcement from '../pages/home/announcement/model'
import announcementDetail from '../pages/home/announcement/detail/model'
import businessFollowList from '../pages/home/businessFollow/model'
import message from '../pages/message/model'
import customer from '../pages/customer/model'
import customerDetail from '../pages/customer/detail/model'
import customerFollow from '../pages/customer/follow/model'
import potentialCustomer from '../pages/potentialCustomer/model'

export default [
  common, 
  home, 
  todoList,
  todoDetail,
  todaySchedule,
  scheduleManage,
  orgTree,
  createSchedule, 
  createBusiness,
  businessFollow,
  businessFollowList,
  mine,
  login,
  confirmRole,
  relationMatter,
  businessManage,
  businessDetail,
  relationSchedule,
  selectCustomer,
  announcement,
  announcementDetail,
  message,
  customer,
  customerDetail,
  customerFollow,
  potentialCustomer
]
