import * as createScheduleApi from './service'

export default {
  namespace: 'createSchedule',
  state: {
    detailData: {}
  },

  effects: {
    * create({data}, { call }) {
      const { code } = yield call(createScheduleApi.create, data.data)
      if (code === 0) {
        data.callback&&data.callback()
      }
    },
    * scheduleDetail({data}, { call, put }) {
      const { code, payload } = yield call(createScheduleApi.scheduleDetail, data)
      if (code === 0) {
        yield put({ type: 'saveDetail',
          payload: {
            detailData: payload,
          }
        })
      }
    },
    * removeSchedule({data}, { call }) {
      const { code } = yield call(createScheduleApi.removeSchedule, data.data)
      if (code === 0) {
        data.callback&&data.callback()
      }
    },
    * update({data}, { call }) {
      const { code } = yield call(createScheduleApi.update, data.data)
      if (code === 0) {
        data.callback&&data.callback()
      }
    },
  },

  reducers: {
    saveDetail(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
