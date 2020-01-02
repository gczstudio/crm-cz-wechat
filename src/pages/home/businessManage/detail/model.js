import * as detailApi from './service'

export default {
  namespace: 'businessDetail',
  state: {
    detailData: {},
    logData: {
      content: []
    }
  },

  effects: {
    * businessSearchById({data}, { call, put }) {
      const { code, payload } = yield call(detailApi.businessSearchById, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            detailData: payload,
          }})
      }
    },
    * searchLogPage({data}, { call, put }) {
      const { code, payload } = yield call(detailApi.searchLogPage, data)
      if (code === 0) {
        yield put({ type: 'saveLog',
          payload: {
            logData: payload,
          }})
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    saveLog(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
