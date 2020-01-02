import * as relationScheduleApi from './service'

export default {
  namespace: 'relationSchedule',
  state: {
    scheduleList: {
      content: []
    }
  },

  effects: {
    * allSchedule({data}, { call, put }) {
      const { code, payload } = yield call(relationScheduleApi.allSchedule, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            scheduleList: payload,
          }})
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },

};
