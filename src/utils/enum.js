
//提醒类型
export const remindType = {
  SERVICE: '业务提醒',
  APPROVE: '审批提醒',
  URGE: '审批催办',
  MARKET: '营销提醒',
  WAIT_ALLOT: '待分配提醒',
  WAIT_SHARE: '待共享提醒',
  SCHEDULE: '日程提醒'
}

//日程类型
export const scheduleTypeEnum = {
  CUSTOMER_VISIT: '客户拜访',
  BUSINESS_OPPORTUNITIES: '商机跟进',
  SCHEDULE_MEETING: '日程会议'
}

//日程类型-简写
export const scheduleTypeEasyEnum = {
  CUSTOMER_VISIT: '拜访',
  BUSINESS_OPPORTUNITIES: '商机',
  SCHEDULE_MEETING: '会议'
}


//日程提醒
export const remindDateEnum = {
  NO_PROMPT: '不提醒',
  START_REMINDING: '开始提醒',
  TENMINUTES_REMINDER: '提前10分钟提醒',
  THIRTYMINUTES_REMINDER: '提前30分钟提醒',
  ONEHOUR_REMINDER: '提前一小时提醒',
  THREEHOUR_REMINDER: '提前三小时提醒',
  ONEDAY_REMINDER: '提前一天提醒'
}


export const remindStatusEnum = {
  1: '受邀',
  2: '知会',
  3: '已参加',
  4: '拒绝'
}

//商机类型
export const busTypeEnum = {
  SELF_BUILD: '自建',
  REMIND: '提醒转化',
  MARKET: '营销转化'
}

//商机跟进状态
export const busStatusEnum = {
  NOT_TOUCH: '未跟进',
  FIRST_TOUCH: '初次接触',
  AGREEMENT: '达成意向',
  SUCCESS: '转化成功',
  DEFEAT: '转化失败'
}

//落地业务
export const landBusEnum = {
  '存款': '存款',
  '签约理财': '签约理财',
  '办理贷款': '办理贷款',
  '签约网银': '签约网银',
  '开办信用卡': '开办信用卡',
  '代收代付': '代收代付'
}


//客户跟进状态
export const followStatusEnum = {
  NORMAL: '初次跟进',
  FIRST_FOLLOW: '初次接触',
  FOLLOW: '正在跟进',
  AGREE: '达成意向',
  SUCCESS: '营销成功',
  FAIL: '营销失败',
}


//证件类型
export const idTypeEnum = {
  1: '身份证',
  2: '护照',
  3: '军官证',
  4: '港澳通行证'
}

//客户来源
export const fromTypeEnum = {
  MARKET: '商机',
  IMPORT: '导入',
  CREATG: '创建'
}


