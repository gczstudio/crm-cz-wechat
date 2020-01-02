import * as todayScheduleApi from './service'

export default {
  namespace: 'todaySchedule',
  state: {
    scheduleList: [],
    allSchedule: {
      content: []
    }
  },

  effects: {
    * myDaySchedule({data}, { call, put }) {
      const { code, payload } = yield call(todayScheduleApi.myDaySchedule, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            scheduleList: payload,
          }})
      }
    },
    * allSchedule({data}, { call, put }) {
      const { code, payload } = yield call(todayScheduleApi.allSchedule, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            allSchedule: payload,
          }})
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
